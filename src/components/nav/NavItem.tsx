import { Button } from "../ui/button";

interface NavItemProps {
  text: string;
}

export default function NavItem({ text }: NavItemProps) {
  return (
    <Button variant="link" className="text-lg">
      {text}
    </Button>
  );
}
