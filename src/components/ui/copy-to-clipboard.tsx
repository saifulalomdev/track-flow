import { Code2 } from 'lucide-react'
import { Button } from './button'
import { toast } from 'sonner';

interface CopyToClipboardProps {
  data: string;
  title: string;
  successMessage: string;
  errorMessage: string;
}

export default function CopyToClipboard({ title, data, errorMessage, successMessage }: CopyToClipboardProps) {

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(data)
      toast.success(successMessage)
    } catch (err) {
      toast.error(errorMessage)
    }
  }

  return (
    <Button onClick={handleCopy} variant="outline" className="gap-2">
      <Code2/> {title}
    </Button>
  )
}
