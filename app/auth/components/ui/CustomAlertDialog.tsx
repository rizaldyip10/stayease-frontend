import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export interface CustomAlertDialogProps {
  className?: string;
  children?: React.ReactNode;
  title?: string;
  message?: string;
  cancel?: string;
  action?: string;
}

class CustomAlertDialog extends React.Component<CustomAlertDialogProps> {
  render() {
    let { className, children, title, message, cancel, action } = this.props;
    return (
      <div className={className}>
        <AlertDialog>
          {children}
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{title}</AlertDialogTitle>
              <AlertDialogDescription>{message}</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              {cancel && <AlertDialogCancel>{cancel}</AlertDialogCancel>}
              <AlertDialogAction>{action}</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    );
  }
}

export default CustomAlertDialog;
