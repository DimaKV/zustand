import { Box, Divider, VStack } from '@chakra-ui/react';
import { FetchTodos } from './components/FetchTodos';
import { Filter } from './components/Filter';
import { NewTodo } from './components/NewTodo';
import { TodoList } from './components/TodoList';
import { TotalTodos } from './components/TotalTodos';
import { Reset } from './components/Reset';

function App() {
  return (
    <VStack spacing={4}>
      <Filter />
      <TodoList />
      <Divider />
      <TotalTodos />
      <NewTodo />
      <Box display="flex" justifyContent="space-between">
        <FetchTodos />
        <Reset />
      </Box>
    </VStack>
  );
}

export default App;
