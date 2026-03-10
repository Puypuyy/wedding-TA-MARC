import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Index as Admin } from './__admin/index.jsx'
import { Index as Client } from './__client/index.jsx'
import { Index as Marketing } from './__marketing/index.jsx'
import { Index as Public } from './__public/index.jsx'
import './App.css'

const routes = new Set(['developerAccess', 'wedorg', 'invitation', 'invitaion'])
const segments = window.location.pathname.split('/').filter(Boolean)
let subdir = segments[0] || ''

// Redirect home to /invitation (or /<base>/invitation for subpath deploys).
if (segments.length === 0) {
	window.location.replace('/invitation')
} else if (segments.length === 1 && !routes.has(segments[0]) && window.location.pathname.endsWith('/')) {
	window.location.replace(`/${segments[0]}/invitation`)
}

// Support both root deploys (/invitation) and subpath deploys (/repo/invitation).
if (!routes.has(subdir) && segments[1] && routes.has(segments[1])) {
	subdir = segments[1]
}

if (subdir === 'invitaion') {
	subdir = 'invitation'
}

let Core

if (subdir === 'developerAccess') {
	Core = Admin
} else if (subdir === 'wedorg') {
	Core = Client
} else if (subdir === 'invitation') {
	Core = Public
} else {
	Core = Marketing
}

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<Core />
	</StrictMode>,
)
