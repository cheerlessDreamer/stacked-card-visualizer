import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MessageSquare } from 'lucide-react';
import FeedbackForm from './FeedbackForm';

const FeedbackDialog: React.FC = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="rounded-full w-16 h-16 shadow-lg">
          <MessageSquare className="w-6 h-6" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Send Feedback</DialogTitle>
        </DialogHeader>
        <FeedbackForm />
      </DialogContent>
    </Dialog>
  );
};

export default FeedbackDialog;