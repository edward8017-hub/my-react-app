// Simple fetch-based API service for https://jsonplaceholder.typicode.com
// Provides small helpers for common CRUD operations on posts/comments/users

const BASE_URL = 'https://jsonplaceholder.typicode.com'

async function request(path, options = {}) {
	const url = `${BASE_URL}${path}`
	const init = {
		headers: {
			'Content-Type': 'application/json',
		},
		...options,
	}

	try {
		const res = await fetch(url, init)
		if (!res.ok) {
			const text = await res.text()
			throw new Error(`HTTP ${res.status} ${res.statusText}: ${text}`)
		}

		const contentType = res.headers.get('content-type') || ''
		if (contentType.includes('application/json')) return await res.json()
		return await res.text()
	} catch (err) {
		// bubble up error with some context
		err.message = `Request to ${url} failed: ${err.message}`
		throw err
	}
}

// Posts
export const getPosts = (params) => {
	const qs = params ? `?${new URLSearchParams(params).toString()}` : ''
	return request(`/posts${qs}`)
}

export const getPost = (id) => request(`/posts/${id}`)

export const createPost = (data) =>
	request('/posts', { method: 'POST', body: JSON.stringify(data) })

export const updatePost = (id, data) =>
	request(`/posts/${id}`, { method: 'PUT', body: JSON.stringify(data) })

export const patchPost = (id, data) =>
	request(`/posts/${id}`, { method: 'PATCH', body: JSON.stringify(data) })

export const deletePost = (id) => request(`/posts/${id}`, { method: 'DELETE' })

// Comments
export const getComments = (params) => {
	const qs = params ? `?${new URLSearchParams(params).toString()}` : ''
	return request(`/comments${qs}`)
}

export const getCommentsByPost = (postId) => request(`/posts/${postId}/comments`)

// Users
export const getUsers = () => request('/users')
export const getUser = (id) => request(`/users/${id}`)

// Default export convenience object
const api = {
	request,
	getPosts,
	getPost,
	createPost,
	updatePost,
	patchPost,
	deletePost,
	getComments,
	getCommentsByPost,
	getUsers,
	getUser,
}

export default api

