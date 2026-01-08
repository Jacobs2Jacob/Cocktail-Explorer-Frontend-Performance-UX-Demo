Live demo hosted at https://yanivjacob.com as a frontend showcase.  
  
**To Execute:**  
	•	Run npm install  
	•	Run the app with npm run dev  
  
**Short Brief**  
A responsive Single Page Application built with React and TypeScript, designed to explore, create, and search cocktails through a smooth, performance-focused UI.  
  
The application emphasizes responsive layouts, dynamic scrolling behavior, efficient rendering of large datasets, and consistent UX feedback across loading, error, and interaction states.    
The domain was intentionally kept simple to highlight frontend execution quality, performance, and usability rather than product complexity.  
  
**Architectural Decisions**  
  
**-FSD (Feature-Sliced Design):**  
A scalable and maintainable architecture that clearly separates feature-level components from shared and reusable UI elements, enabling predictable growth and long-term maintainability.  
  
**-ESLint Import Boundaries**  
Helps maintain a scalable FSD architecture by automatically blocking imports that break layer boundaries, instead of relying on conventions or code reviews.
  
**-Smart Routes:**  
Prepared infrastructure for future route-based feature expansion, improving scalability and separation of concerns.  
  
**-Virtualization:**  
Implemented using react-virtual to support both horizontal and vertical virtualization, enabling efficient rendering and interaction with heavy UI lists while minimizing unnecessary DOM work.  
  
**-React Hook Form:**  
Chosen for a maintainable and performant form experience with built-in validation, minimizing re-renders and improving user feedback during interactions.  
  
**-CSS Modules:**  
Scoped and maintainable styling approach, ensuring predictable UI behavior and avoiding global style collisions.  
  
**-TypeScript:**  
Strong type safety across the application, improving consistency, reliability, and developer experience.  
  
**-Error Handling:**  
Network: Interceptor -> Middleware -> Component -> UI  
Local: Hook -> Component -> UI  
Render: Error boundary -> UI  
  
**-Skeletons:**  
Used as loading indicators to improve perceived performance and maintain visual continuity during async operations.  
  
**-Persistent Storage:**  
Client-side persistence to support user CRUD flows (API limitations acknowledged), enabling uninterrupted UX scenarios.  
  
**-Context API:**
Used selectively for theme management and other low-frequency, non-performance-critical state.  
  
**-Vite:**
Provides fast development feedback, minimal configuration, and a modern frontend tooling setup.  
  
React Patterns used in this app:**  
  
**-Custom Hooks**  
Encapsulating reusable logic and side effects to improve readability and composability.  
  
**-Compound Components**  
Enabling flexible, expressive component APIs while maintaining internal state cohesion.  
  
**-Feature and Reusable Components**  
Clear separation between domain-specific features and shared UI primitives.  
  
**-Layout Pattern**  
A shared parent layout for sibling components to reduce unnecessary unmounts, preserve shared data, and minimize loading transitions for smoother UX.
