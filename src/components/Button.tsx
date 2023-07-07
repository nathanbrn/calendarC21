import { Text, TouchableOpacity } from 'react-native';

interface ButtonProps {
  description?: string;
}

export function Button({ description }: ButtonProps) {
  return (
    <TouchableOpacity className='bg-Blue p-2 rounded-md'>
      <Text className='text-white text-xl bg-Purple rounded-xl py-2 px-4 font-bold'>
        {description}
      </Text>
    </TouchableOpacity>
  );
}
