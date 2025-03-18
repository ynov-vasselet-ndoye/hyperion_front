import { useFetch } from 'nuxt/app'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    try {
        // Call the external API for login
        const response: {
            status: string,
            token: string,
            user_id: number,
            username: string
        } = await $fetch('http://localhost:8000/api/auth/api-login/', {
            method: 'POST',
            body: JSON.stringify(body)

        })
        console.log(response)

        if (!response.token || !response.username) {
            // If the response doesn't include expected data, throw an error
            throw new Error('Invalid response from external API')
        }

        // Store the authentication token and user data in the session
        const user = response.username
        const token = response.token


        // Set the token in cookies or local storage to persist the session
        setCookie(event, 'auth_token', token, {
            httpOnly: true,   // Makes the cookie not accessible via JavaScript
            secure: true,     // Only sent over HTTPS
            maxAge: 60 * 60 * 24 * 7, // 7 days
            path: '/'         // Set for all routes
        })

        // Optionally set the user data (like email, name) in session storage or cookies
        setCookie(event, 'user', JSON.stringify(user), {
            httpOnly: false,  // You might want to store user info in a non-HTTP-only cookie
            maxAge: 60 * 60 * 24 * 7 // 1 week
        })

        return { success: true }
    } catch (error) {
        console.error('Login failed:', error)

        // Return a detailed error message to the client
        return sendError(event, {
            statusCode: 400,
            message: 'Authentication failed. Please check your credentials.',
            error: error.message || 'Unknown error'
        })
    }
})
