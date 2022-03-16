const App = `import { Link,Spacer } from '@nextui-org/react';
    
export default function App() {
  return <>
  <Link color href="#">"First solve the problem. Then, write the code." - Jon Johnson. (Primary)</Link>
  <Spacer/>
  <Link color="secondary" href="#">"First solve the problem. Then, write the code." - Jon Johnson. (Secondary)</Link>
  <Spacer/>
  <Link color="success" href="#">"First solve the problem. Then, write the code." - Jon Johnson. (Success)</Link>
  <Spacer/>
  <Link color="warning" href="#">"First solve the problem. Then, write the code." - Jon Johnson. (Warning)</Link>
  <Spacer/>
  <Link color="error" href="#">"First solve the problem. Then, write the code." - Jon Johnson. (Error)</Link>
  <Spacer/>
  <Link href="#">"First solve the problem. Then, write the code." - Jon Johnson. (Default)</Link>
  </> 
}
`;

const react = {
  '/App.js': App
};

export default {
  ...react
};
