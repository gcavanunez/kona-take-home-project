## Hey!

Hey Sid and Andrew. Thank you very much for this opportunity!

Before we start, since the goal is to **help our customers visualize all consolidated teams through building an org-chart viewer within the Kona platform** I understood that the UI/UX of the assignment was a key feature of deliverable, and though as stated in the prompt is meant to be open ended, is certainly the part where I tried to be as explorative and perhaps even going a bit beyond the scope. Regardless, I tried to put the time cap in context so as not to be infinitely polishing details but rather in broad strokes get the point across of this mvp phase.

## Some explanations:

I essentially sorted the data via different functions at the step getServerSideProps, and passed the tree to the frontend for it to render. Since the UI is open ended I figured there could be N number of teams thus a way to search and mark as favorite a team may seem desirable for this sort of UI.

## Some observations:

Though I initially thought that all users where given on the initial data, I found this id under `U01URC62FJL` Andrew's first and second team which wasn't part of the list provided.

## Some considerations:

1. What do our users care about when visiting this view?
   At first glance the manager would probably like to see the teams and users under the team. Later noticed that having some sort of indicator of which user has administrative/manager privileges would also be important

2. Out of all the given data, what’s the most important to display?
   List of teams and related child teams(consolidatedTeams)

3. What’s the best way to display this aforementioned important data, such that users can _glance_ and get a good understanding of what the org chart looks like?
   Quite subjective but List with

4. How much importance should we place on other factors — like speed, codebase scalability, very rare edge cases, etc?
   Certainly when increasing in complexity this should be paginated and should be added a limit to the amount of users in a group.
   I used Next and typescript in this example since as I see it there is a bit of backend logic to sort out, but the object can add more and more complexity thus typescript aids with future refactorings though arguably subtracts on speeds.
   Edge cases such as channels no longer existing, or a user is no longer part of the organization but hasn't been deleted from the teams may be needed to be contemplated as to not break the UI and information displayed

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
