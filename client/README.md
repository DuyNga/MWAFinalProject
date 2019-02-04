Modern Web Applications CS572
Final Project
 This is a team-based project.
The project will contribute 25 points to your final grade.
Application specifications and requirements
Your will build a screening app for students to apply and study programming at a computer science
university.
The system has three roles:
- Admin
- Admission staff
- Prospective student
Admin
The admin may create admission staff users, and set exam questions and evaluate students’ answers.
- add/activate/deactivate questions
- add/activate/deactivate admission staff
- review answers (exam report) and publish the results
Admission staff
- The admission staff sends invites to prospective students by email
- They can check status of all invitations (sent, answered, finished: pass/fail)
Prospective student
- They click on the invitation link (has temporary one time token) and take the exam
Exam specifications
When students click on their invitation link they will see the following instructions about the exam:
- The exam can only be taken once, when started and questions are displayed student must
submit the answers or they fail. (They will need new invitation to take the exam again)
- The exam will be one page with 3 programming questions, timed for 120 minutes (2 hours).
- Click start to begin. 
Exam technical details
- The exam is constructed from 3 randomly active questions from the DB.
- The system will record how much time in total.
- The system will save code snapshots for every question, every time new data is available (similar
to auto save). Admin will be able to play through these snapshots through <progress> element
and see students’ progress.
- The system will offer basic IDE that has at least: line numbers and code syntax highlighter (Ace)
You project must include all the following components
 App must be served to authenticated users only (active admission staff or admin).
 Exam must be taken through a one time temporary token
 Integrate with an email service (nodemailer configured with gmail)
 Use a UI Kit (Angular Material, UIkit, Covalent, Flatkit, ngBootstrap.. etc ).
Extra points (Optional)
• Use state management architecture (Redux, MobX..etc).
Technical information
• You must use all the technologies we learned in our course (MEAN stack).
• Design your own DB, skeleton and app structure. Start by planning your screens and split your
work between all members. (DB as a service is advised – mLab or Atlas).
• Every team member should be responsible for implementing at least one use-case or project
component from start to end. (You may also decide that every team member will take
responsibility for either backend or frontend development, must explain details in the project
plan).
• All Angular routes should be protected from public access by JWT (except sign up and sign in routes)
• All Express routes should be protected from public access by JWT (except sign up and sign in routes)
• Exam page should only be accessible to students with valid exam token
• Exam API routes should be protected and allowed only to students with valid exam token
• Every team is expected to have one online SVN/Git repo (project leads have to invite their team
members to the project repo). All team members must push to the same repo.
• A daily push is required for each member to track your code and performance. If you miss a
push that will affect your final grade.
• Do not push any private key of any service to Git. (If found, your account will be terminated and
you may be legally sued by service providers). Write your keys in a config file (dotenv) and add
the filename to .gitignore
• Do not spend more than two hours on a problem, move on, or find an alternative. 
Notes and daily routine
All team leads are required to send me an email to (asaad@mum.edu) with their project plan + git link
by Monday 12:00 pm (A project plan has detailed daily schedule for each member and what they will be
responsible for – tasks/roles). I’ll use this project plan to follow up with you. Your daily Git push is
required to check your performance.
I’ll be available to answer your questions any time by email, or in person on Monday and Tuesday and
Wednesday in our classroom from 10 am to noon (or find me in my office, 2nd floor McLaughlin room
209). You are not required come or to be in the classroom in these days. Usually only students who have
questions or need some help will show up and I’ll give you quick solution or suggestion (First come first
served).
Note: classroom will be open and available all days.
Even though projects will be developed in teams, every team member will be graded individually based
on their contribution and their quality of work. Team leads will be responsible for leading, mentoring
their teammates and making the project succeed.
Final Evaluation
Before the evaluation starts, all team leads are required to send me an email to (asaad@mum.edu) with
their project repo URL + attached file for the project config file (private keys and connection string).
On Thursday, there will be an individual project evaluation session with each team. I will spend around
15 minutes with every team. Evaluation schedule TBD later.
Good luck and happy coding! 