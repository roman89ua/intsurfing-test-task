# To run application
1. Clone the repository;
2. `cd .\intsurfing-test-task\`;
3. `npm i / npm install`;
4. `npm run dev`


# Task requirements
Develop a React application for displaying a table with data fetched from the PokeAPI.
# Features:
- Implement columns sorting functionality.
- Add pagination to display a limited number of entries per page.
- Click on a table row should display additional information about the selected entity.
- Display a loader while the data is being fetched (randomly simulate a delay if it is needed).

# Technologies:
- React. Use React Hooks (avoid class components).
-  TypeScript
-  Use Material UI components for clean and responsive design.



# NOTE: Load indicator
We have two types of load indicators. 
1. Spinner - global load indicator which tell us that page loads.
2. Local "Skeleton" load indicators - each case specific.
For 
To be able to see all load indicators please use "Slow 3G" from "Network tab" in "Browser DevTools" for Pokemon Details page. Also I have made some delay for Pokemon Details page to make sure that you will not miss Skeleton load indicator
For Table with pokemons list you can simply select 100 items per page and wou will definitely not miss Skeleton load indicator
