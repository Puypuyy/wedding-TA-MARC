# RSVP Setup (Google Sheets + Apps Script)

## 1. Create Google Sheet
Create a sheet named `Guests` with this exact header row in row 1:

`code | guest_name | reserved_seats | confirmed_seats | status | submitted_at | note`

Example rows:

`MARC123 | Juan Dela Cruz | 3 | 0 | pending |  | `

`ANNA555 | Maria Santos | 2 | 0 | pending |  | `

## 2. Deploy Apps Script API
1. Open the Google Sheet.
2. Go to `Extensions` -> `Apps Script`.
3. Replace the script content with `google-apps-script/Code.gs` from this repo.
4. Save.
5. Click `Deploy` -> `New deployment`.
6. Type: `Web app`.
7. Execute as: `Me`.
8. Who has access: `Anyone`.
9. Deploy and copy the Web App URL.

## 3. Configure Frontend
1. Copy `.env.example` to `.env`.
2. Set:

`VITE_RSVP_API_URL=<your web app url>`

3. Restart dev server (`npm run dev`) after changing `.env`.

## 4. RSVP Flow in App
1. Guest clicks `RSVP Now`.
2. Guest enters code and clicks `Check Code`.
3. App loads `guest_name` and `reserved_seats`.
4. Guest enters attending seats and confirms.
5. Sheet updates automatically:
   - `confirmed_seats`
   - `status` (`declined`, `partial`, `confirmed`)
   - `submitted_at`
   - `note`

## 5. API Payloads
Validate request:

```json
{
  "action": "validate",
  "code": "MARC123"
}
```

Submit request:

```json
{
  "action": "submit",
  "code": "MARC123",
  "attendingSeats": 2,
  "note": "Will arrive before ceremony."
}
```

## Notes
- Codes are case-insensitive.
- `attendingSeats` cannot exceed `reserved_seats`.
- Keep your sheet private; only expose the Apps Script Web App URL.

