import { getUIComponent } from '@repo/ui/component';

const Button = getUIComponent('Button');

export const HomePage = () => {
  return (
    <div>
      Home page
      <Button>Hello</Button>
    </div>
  )
};