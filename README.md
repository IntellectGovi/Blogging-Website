Medium-Like Blogging Platform 📝
================================

A blogging platform inspired by **Medium**, built with modern technologies to enhance performance, scalability, and developer experience.

Features
--------

*   **HONO** instead of Express.js for a lightweight and fast routing layer.
    
*   **Prisma ORM** (replacing MongoDB) for managing the SQL database with connection pooling for optimized performance.
    
*   **Custom npm package** development and **monorepo** structure for modularity and easy maintenance.
    
*   Hosted backend services on **Cloudflare Worker** for serverless and scalable backend infrastructure.
    
*   **TypeScript** for static typing, making the codebase more reliable and easier to maintain.
    
*   **Neon.tech** as the SQL database provider, offering advanced features and a smooth developer experience.
    
*   **Custom React Hooks** for cleaner logic and better code reuse.
    
*   **Recoil** for state management, ensuring a responsive and dynamic UI.
    

Tech Stack
----------

*   **Frontend**: React, TypeScript, Recoil
    
*   **Backend**: HONO, Cloudflare Worker, Prisma, Neon.tech
    
*   **Database**: PostgreSQL (via Neon.tech)
    
*   **State Management**: Recoil
    
*   **Deployment**: Cloudflare Worker
    

Installation
------------

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/medium-like-blogging-platform.git
   cd medium-like-blogging-platform
2. **Install Dependencies**:

   ```bash
   npm install
    
3. Set up env variables::

   ```bash
   DATABASE_URL=your_neon_tech_database_url
   
4. Start the Development server::

   ```bash
   npm run dev

## Deployment

5. **Deployment**:

   ```bash
   npm run deploy

Make sure to have the necessary access tokens and environment configurations in place for deployment.


## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contributing

Feel free to submit issues or pull requests. Contributions are always welcome!
