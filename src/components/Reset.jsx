import { useTodos } from '../store';
import { Button } from '@chakra-ui/react';

const Reset = () => {
  const reset = useTodos((state) => state.reset);

  return (
    <Button colorScheme="red" onClick={() => reset()} marginLeft={2}>
      Reset
    </Button>
  );
};

export { Reset };
