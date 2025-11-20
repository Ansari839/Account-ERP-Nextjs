# QWEN Project Notes

## Stack
- Frontend: Next.js + ShadCN / TailwindCSS
- Backend: Node.js + Next.js API Routes
- Database: MongoDB
- ORM / ODM: Mongoose
- Validation: Zod
- API Calls: Axios
- Dark/Light mode support

## Project Structure

### Backend
- `/pages/api`: API routes only
- `/controllers`: Business logic, CRUD
- `/models`: Mongoose models
- `/lib`: MongoDB connection helpers
- `/helpers`: Reusable functions (validation, utils)
- `/constants`: Static data, enums

### Frontend
- `/components`: Reusable UI components only
  - Layout: Sidebar, Header, DashboardLayout
  - UI: Button, Input, Select, etc.
- `/hooks`: Data fetching, CRUD hooks, custom hooks (e.g., useTheme)
- `/utils`: Helper functions, fetcher wrappers
- `/constants`: Static data (dropdown options, etc.)

## Clean Code Rules
1. Logic separated from UI
2. Reusable code in hooks/helpers/libs
3. Constants in separate files
4. Mapping / loops in components only
5. Frontend only handles rendering & UI logic
6. Backend handles all database & business logic
7. Zod for validation
8. Axios for API calls
9. ShadCN components for consistent UI
10. Sidebar & header components must be responsive and reusable
11. Dark/Light theme should be toggleable via custom hook

## Notes for CLI Generated Code
- Every prompt should mention: “Follow QWEN.md for stack & clean code structure”
- Any generated feature must follow component-based structure
- Dashboard page: Responsive, Sidebar collapsable, Header with search & theme toggle
- Sidebar: Only "Overview" tab initially; reserve space for future feature tabs
- Controllers: Only handle DB and business logic
- Models: Define schema via Mongoose
- Hooks: Handle data fetching / state / theme
- Utils & Helpers: For reusable functions
- Constants: For static data, enums, dropdowns

## Database / Mongoose Notes
- MongoDB connection handled in `/lib/db.js`
- Models in `/models` folder
- CRUD via Mongoose methods: `find()`, `create()`, `findByIdAndUpdate()`, `findByIdAndDelete()`
- Use async/await and proper error handling
- Validation via Zod on request bodies

---
## Example Folder Structure

/account-app
├─ /models
│  └─ Account.js         # Mongoose model
├─ /controllers
│  └─ accountController.js
├─ /lib
│  └─ db.js              # MongoDB connection via Mongoose
├─ /helpers
│  └─ validation.js      # Zod validation
├─ /constants
│  └─ accountConstants.js
├─ /pages/api
│  └─ accounts
│     ├─ index.js        # GET all / POST
│     └─ [id].js         # GET by id, PUT, DELETE


> Keep this file as the single source of truth for stack, structure, and clean code rules.
