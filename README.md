# MFNews Frontend

MFNews is a modern news application built with React and TypeScript, providing a sleek and responsive user interface for browsing and reading news articles.

## 🚀 Technologies

- React 19
- TypeScript
- Vite
- Ant Design (antd)
- React Router DOM
- Axios
- Vitest for testing

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (Latest LTS version recommended)
- npm or yarn
- LocalStack (for local S3 storage)

## 🛠️ Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd MFNews-FE
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

## 🚀 Development

To start the development server:

```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173`

## 🏗️ Building for Production

To create a production build:

```bash
npm run build
# or
yarn build
```

## 🧪 Testing

The project uses Vitest for testing. You can run tests using the following commands:

```bash
# Run tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run tests with UI
npm run test:ui
```

## 📁 Project Structure

```
src/
├── assets/        # Static assets
├── components/    # Reusable components
├── context/       # React context providers
├── services/      # API services and utilities
├── types/         # TypeScript type definitions
├── __tests__/     # Test files
├── App.tsx        # Main application component
└── main.tsx       # Application entry point
```

## 🔍 Code Quality

The project uses ESLint for code linting:

```bash
npm run lint
# or
yarn lint
```

## ✨ Features

### News Management
- Create, read, update, and delete news articles
- Rich text editor for article content
- Image upload support with preview
- Responsive image handling
- Search functionality for news articles
- Image storage using LocalStack (S3)

### Image Handling
- Support for image uploads up to 2MB
- Image preview before upload
- Automatic image optimization
- Secure image storage in LocalStack
- Support for common image formats (JPEG, PNG, GIF)
- Responsive image display in news cards and details
- Image caching and lazy loading

### User Management
- User authentication and authorization
- Role-based access control (Admin/User)
- User management interface for administrators
- User creation and management

### UI/UX Improvements
- Modern and responsive design
- Mobile-first approach
- Custom color scheme and branding
- Loading states and error handling
- Success/error notifications
- Responsive navigation bar with search
- Image optimization and lazy loading

### Security
- Environment variable configuration
- Secure authentication handling
- Protected routes
- Input validation and sanitization
- Secure image upload handling

### Performance
- Code splitting
- Lazy loading of components
- Optimized image handling
- Efficient state management
- Image compression and optimization

## 🔧 Configuration

The application uses environment variables for configuration. Create a `.env` file in the root directory with the following variables:

```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_AUTH_TOKEN_KEY=token
VITE_USER_KEY=user
VITE_APP_ENV=development
VITE_APP_VERSION=0.0.0
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_LOGGING=true
```

## 📸 Image Upload Process

The application handles image uploads through the following process:

1. **Frontend Validation**:
   - Validates image type (must be an image file)
   - Checks file size (max 2MB)
   - Provides image preview
   - Handles upload cancellation

2. **Upload Process**:
   - Images are sent to the backend using FormData
   - Backend processes the image and uploads it to LocalStack
   - Returns the permanent URL of the uploaded image
   - URL is stored in the database with the news article

3. **Image Display**:
   - Images are displayed responsively in news cards and details
   - Lazy loading is implemented for better performance
   - Fallback handling for failed image loads
   - Optimized image loading based on viewport size
