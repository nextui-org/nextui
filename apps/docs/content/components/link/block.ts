const App = `import { Link,Spacer } from '@nextui-org/react';
    
export default function App() {
  return <>
  <Link block color="primary" href="#">"First solve the problem. Then, write the code." - Jon Johnson. (Primary)</Link>
  <Spacer/>
  <Link block color="secondary" href="#">"First solve the problem. Then, write the code." - Jon Johnson. (Secondary)</Link>
  <Spacer/>
  <Link block color="success" href="#">"First solve the problem. Then, write the code." - Jon Johnson. (Success)</Link>
  <Spacer/>
  <Link block color="warning" href="#">"First solve the problem. Then, write the code." - Jon Johnson. (Warning)</Link>
  <Spacer/>
  <Link block color="error" href="#">"First solve the problem. Then, write the code." - Jon Johnson. (Error)</Link>
  </> 
}
`;

const react = {
  '/App.js': App
};

export default {
  ...react
};
