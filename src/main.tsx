import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Index as Admin } from './__admin/index.tsx'
import { Index as Client } from './__client/index.tsx'
import { Index as Marketing } from './__marketing/index.tsx'
import { Index as Public } from './__public/index.tsx'
import './App.css'

const loc = window.location.pathname
const subdir = loc.split('/')[2]
let Core

console.log(subdir)

if (subdir === 'developerAccess') {
	Core = Admin
} else if (subdir === 'wedorg') {
	Core = Client
} else if (subdir === 'invitation') {
	Core = Public
} else {
	Core = Marketing
}

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Core />
	</StrictMode>,
)
