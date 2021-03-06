import { Transition } from '@headlessui/react';

import { useHighContrast } from '../provider/high-contrast';

const TransitionWrapper = ({ children, condition, wrapper }) =>
  condition ? wrapper(children) : children;

const Letter = ({ children, evaluation }) => {
  const { highContrastState } = useHighContrast();

  return (
    <TransitionWrapper
      condition={children !== ''}
      wrapper={(child) =>
        evaluation !== undefined && evaluation !== 'none' ? (
          <Transition
            appear={true}
            show={true}
            enter="transition duration-1000"
            enterFrom="scale-y-0"
            enterTo="scale-y-100"
          >
            {child}
          </Transition>
        ) : (
          <Transition
            appear={true}
            show={true}
            enter="transition duration-75"
            enterFrom="scale-100"
            enterTo="scale-125"
          >
            {child}
          </Transition>
        )
      }
    >
      <div
        className={[
          'flex items-center justify-center border-2 w-12 h-12 md:w-[65px] md:h-[65px] dark:text-white dark:border-gray-400',
          evaluation === 'present' &&
            `${
              highContrastState
                ? 'bg-blue-400 border-blue-400 dark:border-blue-400'
                : 'bg-yellow-600 border-yellow-600 dark:border-yellow-600'
            } text-white`,
          evaluation === 'absent' &&
            'bg-gray-600 border-gray-600 dark:border-gray-600 text-white',
          evaluation === 'correct' &&
            `${
              highContrastState
                ? 'bg-orange-600 border-orange-600 dark:border-orange-600'
                : 'bg-green-600 border-green-600 dark:border-green-600'
            } text-white`,
          evaluation === 'none' && 'text-black',
        ].join(' ')}
      >
        <h1 className="text-4xl font-extrabold uppercase cursor-default">
          {children || ''}
        </h1>
      </div>
    </TransitionWrapper>
  );
};

export default Letter;
