import { Text, TouchableOpacity } from 'react-native';

interface ButtonProps {
  description?: string;
  onClick?: () => void;
}

export function Button({ description, onClick }: ButtonProps) {
  return (
    <TouchableOpacity
      onPress={onClick}
      className='mx-auto bg-Blue p-2 border rounded-md w-44 items-center'>
      <Text className='text-white text-xl font-bold'
      >
        {description}
      </Text>
    </TouchableOpacity>
  );
}
