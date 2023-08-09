import { Feather } from '@expo/vector-icons';
import { Text, TouchableOpacity } from 'react-native';

interface ButtonProps {
  description?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  type: string;
}

export function Button({ description, onClick, icon, type }: ButtonProps) {
  if (type === 'primary') {
    return (
      <TouchableOpacity
        onPress={onClick}
        className='flex-col mx-auto mb-1 bg-Blue py-2 px-3 rounded-md items-center justify-center'>
        { icon && <Text className='text-white text-xl font-bold'>{icon}</Text>}
        { description && <Text className='text-white text-sm font-bold'>{description}</Text>}
      </TouchableOpacity>
    );
  } else if (type === 'secondary') {
    return (
      <TouchableOpacity
        onPress={onClick}
        className='flex-col mx-auto mb-1 bg-Blue py-2 px-3 rounded-md items-center justify-center'>
        { icon && <Text className='text-white text-xl font-bold'>{icon}</Text>}
        { description && <Text className='text-gray-500 text-sm font-bold'>{description}</Text>}
      </TouchableOpacity>
    );
  } else if (type === 'terciary') {
    return (
      <TouchableOpacity
        onPress={onClick}
        className='flex-col border mx-auto mb-1 bg-Blue py-1 px-2 rounded-xl mt-2 items-center justify-center bg-green-500'>
        { icon && <Text className='text-white text-xl font-bold'>{icon}</Text>}
        { description && <Text className='text-white text-sm font-bold'>{description}</Text>}
      </TouchableOpacity>
    );
  } else if (type === 'confirm') {
    return (
      <TouchableOpacity
        onPress={onClick}
        className='flex-col border mx-auto mb-1 bg-Blue py-3 px-6 rounded-lg mt-4 items-center justify-center bg-purple-500'>
        { icon && <Text className='text-white text-xl font-bold'>{icon}</Text>}
        { description && <Text className='text-white text-sm font-bold'>{description}</Text>}
      </TouchableOpacity>
    );
  } else if (type === 'date') {
    return (
      <TouchableOpacity
        onPress={onClick}
        className='flex-col mx-auto mb-1 bg-Blue py-3 px-6 rounded-lg mt-4 items-center justify-center'>
        { icon && <Text className='text-white text-xl font-bold'>{icon}</Text>}
        { description && <Text className='text-white text-center font-bold'>
            Clique aqui
        </Text>}
      </TouchableOpacity>
    );
  } else if (type === 'time') {
    return (
      <TouchableOpacity
        onPress={onClick}
        className='flex-col mx-auto mb-1 bg-Blue py-3 px-6 rounded-lg mt-4 items-center justify-center'>
        { icon && <Text className='text-white text-xl font-bold'>{icon}</Text>}
        { description && <Text className='text-white text-center font-bold'>
            Clique aqui
        </Text>}
      </TouchableOpacity>
    );
  }

  return null;
}
