// CV data for Mostafa Eslam Elsayed
const cvData = {
  about: {
    title: "About Me",
    content: `
            <div class="cv-section">
                <h3>Hello, I'm Mostafa Eslam Elsayed</h3>
                <p>I am a passionate AI Engineer with a strong background in Artificial Intelligence and Machine Learning. 
                   I'm focused on developing intelligent systems and applying cutting-edge AI techniques to solve real-world problems.</p>
                <p>My approach to work combines technical expertise with creative problem-solving, 
                   allowing me to tackle complex challenges effectively. I'm constantly learning and 
                   adapting to new technologies in the rapidly evolving field of AI.</p>
                <p>Outside of work, I enjoy gaming, chess, scientific exploration, animal care, music, swimming, 
                   and electronics & DIY projects, which help me maintain a balanced perspective and bring fresh ideas to my professional work.</p>
            </div>
        `,
  },

  education: {
    title: "Education",
    content: `
            <div class="cv-section">
                <div class="education-item">
                    <h3>Arab Academy for Science, Technology & Maritime Transport</h3>
                    <div class="date">2021 - 2025</div>
                    <p>B.Sc. in Artificial Intelligence (Intelligent Systems Department)</p>
                    <p><strong>Core Courses:</strong> Data Structures & Algorithms, Machine Learning, Deep Learning, Reinforcement Learning, 
                    Computer Vision, Natural Language Processing, Web Development, Cloud Computing, Image Processing, Advanced Artificial Intelligence</p>
                </div>
            </div>
        `,
  },

  experience: {
    title: "Work Experience & Certifications",
    content: `
            <div class="cv-section">
                <div class="experience-item">
                    <h3>Machine Learning Intern at Mentorness Recruitment Service</h3>
                    <div class="date">May 2024 - June 2024</div>
                    <ul>
                        <li>Applied machine learning pipelines on real-world recruitment datasets</li>
                        <li>Performed preprocessing and trained models using scikit-learn</li>
                        <li>Optimized performance for deployment</li>
                    </ul>
                </div>
                
                <div class="experience-item">
                    <h3>Generative AI Professional Trainee at Pioneers of Digital Egypt Initiative</h3>
                    <div class="date">June 2024 - October 2024</div>
                    <ul>
                        <li>Focused on building expertise in Generative AI, including GANs and Large Language Models (LLMs)</li>
                        <li>Participated in real projects applying generative techniques using tools like PyTorch and Hugging Face</li>
                        <li>Gained practical knowledge in model fine-tuning, deployment, and ethical use of generative AI in production</li>
                    </ul>
                      <h3 style="margin-top: 20px;">Certifications</h3>
                <ul>
                    <li>Machine Learning in Production — DeepLearning.AI (Coursera) - September 2024</li>
                    <li>Delivering Quality Work with Agility — IBM (Coursera) - September 2024</li>
                    <li>Generative AI Professional (159 Hours) — Digital Egypt Pioneers Program (DEPI) - April – October 2024</li>
                    <li>Introduction to Machine Learning (60 hours) — Information Technology Institute (ITI) - August 2023</li>
                    <li>Cybersecurity Professional Skills — NTRA Egypt, EG-CERT - September 2022</li>
                    <li>Machine Learning Internship — Mentorness - May – June 2024</li>
                    <li>Summer Seminar Attendee — RobotLAB - June 2022</li>
                    <li>RoboCup Junior (Rescue Line) — AAST Egypt - March 2022</li>
                    <li>Business English Track — Digital Egypt Pioneers - April – October 2024</li>
                </ul>
                </div>
            </div>
        `,
  },

  skills: {
    title: "Technical Skills",
    content: `
            <div class="cv-section">
                <h3>Programming Languages</h3>
                <div class="skills-container">
                    <span class="skill">Python</span>
                    <span class="skill">C</span>
                    <span class="skill">C++</span>
                    <span class="skill">HTML</span>
                    <span class="skill">Prolog</span>
                </div>
                
                <h3>Frameworks & Libraries</h3>
                <div class="skills-container">
                    <span class="skill">TensorFlow</span>
                    <span class="skill">PyTorch</span>
                    <span class="skill">Scikit-learn</span>
                    <span class="skill">Pandas</span>
                    <span class="skill">NumPy</span>
                    <span class="skill">OpenCV</span>
                    <span class="skill">Seaborn</span>
                    <span class="skill">Matplotlib</span>
                    <span class="skill">Flask</span>
                    <span class="skill">FastAPI</span>
                    <span class="skill">Node.js</span>
                    <span class="skill">ROS</span>
                    <span class="skill">MATLAB</span>
                </div>
                
                <h3>Tools & Platforms</h3>
                <div class="skills-container">
                    <span class="skill">Docker</span>
                    <span class="skill">Git</span>
                    <span class="skill">GitHub</span>
                    <span class="skill">VS Code</span>
                    <span class="skill">MySQL</span>
                    <span class="skill">Arduino</span>
                    <span class="skill">AWS</span>
                    <span class="skill">Linux</span>
                    <span class="skill">Windows</span>
                </div>
                
                <h3>Concepts & Methodologies</h3>
                <div class="skills-container">
                    <span class="skill">Data Structures</span>
                    <span class="skill">Algorithms</span>
                    <span class="skill">UML Design</span>
                    <span class="skill">Software Documentation</span>
                    <span class="skill">Kinematics</span>
                    <span class="skill">Problem Solving</span>
                </div>
                
                <h3>Languages</h3>
                <div class="skills-container">
                    <span class="skill">Arabic (Native)</span>
                    <span class="skill">English (Fluent)</span>
                </div>
            </div>
        `,
  },

  projects: {
    title: "Projects",
    content: `
            <div class="cv-section">
                <div class="project-item">
                    <h3>AI-Powered Educational Avatar in Augmented Reality</h3>
                    <div class="date">September 2024 - Present</div>
                    <p>Designed an interactive teaching avatar displayed via XREAL Air 2 Ultra AR glasses and integrated with a web-based learning platform. 
                    Combined Gemini LLM for natural language understanding, ElevenLabs for speech synthesis, and Whisper STT for real-time audio interaction 
                    to create an immersive, AI-driven educational experience.</p>
                    <p><strong>Technologies used:</strong> AR, Gemini LLM, ElevenLabs, Whisper STT</p>
                </div>
                
                <div class="project-item">
                    <h3>Face Emotion Recognition</h3>
                    <div class="date">December 2023</div>
                    <p>Built a CNN model to recognize emotions in real time from facial expressions, trained on 35,000+ images and 
                    integrated with OpenCV for live webcam inference.</p>
                    <p><strong>Technologies used:</strong> CNN, OpenCV, Deep Learning</p>
                </div>
                
                <div class="project-item">
                    <h3>Daily Website Visitors Prediction</h3>
                    <div class="date">May 2023</div>
                    <p>Developed a time series forecasting model using SARIMA to predict daily web traffic with 85% accuracy; 
                    built an interactive dashboard with live visualizations.</p>
                    <p><strong>Technologies used:</strong> SARIMA, Time Series Analysis, Data Visualization</p>
                </div>
                
                <div class="project-item">
                    <h3>Smartphone Price Prediction</h3>
                    <div class="date">August 2024</div>
                    <p>Built a predictive ML model using product specs to estimate smartphone prices, deployed via REST API with Docker, 
                    applying MLOps for continuous integration and testing.</p>
                    <p><strong>Technologies used:</strong> ML, Docker, REST API, MLOps</p>
                </div>
                
                <div class="project-item">
                    <h3>NLP-Based Code Generation</h3>
                    <div class="date">October 2024</div>
                    <p>Developed a model to generate Python codes from natural language prompts using NLP techniques. 
                    Preprocessed training data, fine-tuned generation quality, and validated outputs based on syntax correctness and logic accuracy.</p>
                    <p><strong>Technologies used:</strong> NLP, Python, Code Generation</p>
                </div>
            </div>
        `,
  },

  contact: {
    title: "Contact Me",
    content: `
            <div class="cv-section">
                <h3>Get In Touch</h3>
                <p>I'm always open to discussing new projects, creative ideas or opportunities to be part of your vision.</p>
                
                <ul style="list-style-type: none; padding-left: 0; margin-top: 20px;">
                    <li> Email: <a href="mailto:mostafaeslam1220@gmail.com">mostafaeslam1220@gmail.com</a></li>
                    <li> Phone: +20 111 214 4903</li>
                    <li> LinkedIn: <a href="https://www.linkedin.com/in/mostafa-eslam-85037423b/" target="_blank">linkedin.com/in/MostafaEslam</a></li>
                    <li> GitHub: <a href="https://github.com/MostafaEslam" target="_blank">github.com/MostafaEslam</a></li>
                </ul>
            </div>
        `,
  },
};
