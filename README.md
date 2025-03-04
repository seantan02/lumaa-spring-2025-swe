# Project README

*Let's build Lumaa together!*

## Video Demo
- link: https://drive.google.com/file/d/1VlDoFqvb4Um1Xb7EwXZOPtX8UttnNJiT/view?usp=sharing

## Time Spent on Development

- **Backend**: 2.5 hours. The main focus was on proper TypeScript typing, integrating ORM, working with tokens, and Docker setup.
  - *Note*: - There's no services and controllers as I kept the backend as minimal as possibles so that there's not too many folders and files to take care of, which is one of my previous mentor's values - Simplicity.
            - 4 files in total ONLY to have this running ready to go.
            - Minimal helped from AI, mostly from experience
- **Frontend**: around 45 minutes. The main focus was on implementing Bootstrap and ensuring proper TypeScript typing.

## Setup Instructions

### 1. Setup Instructions
- You can run your own database locally or follow the simple guide below to run all in one go!

This project uses PostgreSQL as the default database. If you are using a different database, please refer to the official TypeORM documentation for the required library installation and configuration.

1. Create .env file in backend folder and make sure it contains:
- `DB_HOST`: Host of the PostgreSQL database
- `DB_PORT`: Port where PostgreSQL is running
- `DB_USER`: Database user
- `DB_PASSWORD`: Database password
- `DB_NAME`: Name of the database
- `SECRET_KEY`: Secret key to sign and decrypt the token
- `PORT`: Port of the backend system to run on

- Example:
```
DB_HOST="lumaa_db"
DB_PORT="5432"
DB_USER="sean"
DB_PASSWORD="12341234"
DB_NAME="db"
SECRET_KEY="ahisbdiub18e1802eh1n9dn9@HE*H!HEH!@nadjnadaisndoiandoiw123"
PORT="3000"
```

2. Create .env file in frontend folder, make sure it contains:
- `REACT_APP_API_URL`: The API url the backend is running on
- `PORT`: The port that the frontend React app will run on
    - OPTIONAL - only if you are running it with "npm start", you don't have to worry about this

- Example:

```
REACT_APP_API_URL="http://localhost:3000"
PORT=8000
```

3. Install Docker on your machine if not installed, follow guide here: https://docs.docker.com/engine/install/

4. Install Makefile on your machine if not installed (Should come pre-installed for Macs and Linux)
- for window, do:
    a. Open terminal as admin
  
    b. run "Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.SecurityProtocolType]::Tls12; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))"
  
    c. run "choco install make"
  
    d. run "make --version" to check if it's installed

5. open a terminal and make sure you are at the root folder of this project (same level as this README) and run

    a. make clean

    b. make run
* Run them in order a then b

6. Wait until you see successful connection on the terminal from backend, and idle state for frontend, you should be good to go!

7. Open up 'http://localhost:8000'

- To run specific thing like backend, or frontend, or database
- Instead of step 5, do "docker-compose up $WHICHEVER --build", where $WHICHEVER should be replaced by either 'backend', 'frontend', or 'lumaa_db' for database.

## Testing Notes

### Base on my experience, here's the testing I recommend:
1. Unit testing on backend and frontend functions using framework like jest for Express JS (Node JS), and frontend (React)
2. Integration testing to make sure everything works perfectly between frontend and backend
3. Regression testing to measure quality and performance of every version of our system

- I have done all of them personally in my experience as Student Software Developer, or as Software Performance Engineer Intern at SKYGEN USA LLC
- More improvements:

    a. Implement logging (at least one logger)

    b. Add API documentation

    c. Implement rate limiting
  
    d. Add refresh tokens
  
    e. Add security headers
  
    f. Implement request sanitization
  
    g. Create service layer
  
    h. Add request/response DTOs
  
    i. Implement proper error handling middleware

## Salary and Compensation Proposal
- I am truly excited about the opportunity to join Lumaa and contribute to its growth journey. My primary motivation is to be part of an innovative team where I can both contribute meaningfully and continue to grow professionally. **Let's build Lumaa together!**

### 1. In-office or Hybrid Role (San Francisco)
- I am open to relocating to San Francisco without assistance and understand the higher cost of living in the area. As such, I propose the following compensation:

1. Base Salary: $35/hour (reflecting the lower end of the pay scale for SF to accommodate the cost of living)
2. Company Shares: A reasonable amount of equity based on company standards and the role’s contribution potential.
3. Performance Bonus: A bonus structure ranging from 10-20% of salary, based on measurable outcomes such as:
    - Progress in software development and feature delivery.
    - User growth and engagement on the platform.
    - Positive feedback and satisfaction from users.

I believe this package reflects my commitment to the company’s growth while also aligning with the competitive landscape in San Francisco. I am open to discussing the specifics of share allocation and bonus details as part of the overall compensation.

### 2. Remote Role (If Applicable)
- If the role is remote, I am happy to collaborate through tools such as Zoom and other online communication platforms. For remote work, I would propose the following compensation package:

1. Base Salary: $25/hour (to reflect the savings from working remotely while still offering competitive compensation).
2. Performance Bonus: A bonus structure of 1-20%, contingent on the same performance metrics, such as mentioned above.

What excites me most about Lumaa is the opportunity to be part of building something impactful. I'm very flexible on the compensation structure and am open to adjusting any of these elements. My priority is joining a team where I can learn, grow, and make meaningful contributions to Lumaa's success.

I would welcome the chance to discuss how I can best add value to the team and align my compensation with the company's current stage and needs.


## Why Me

- As one who was a founding SWE prior to college, I am obsessed with being a founding SWE, let's build Lumaa together!
