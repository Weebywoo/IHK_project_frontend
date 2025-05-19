import type {JSX} from 'react';
import {AddDeploymentForm} from '@/components/AddDeploymentForm/AddDeploymentForm.tsx';
import {Dialog, DialogClose, DialogContent, DialogFooter, DialogTitle, DialogTrigger} from '@/components/ui/dialog.tsx';
import {Button} from '@/components/ui/button.tsx';



export function AddDeploymentDialog(): JSX.Element {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Add</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>Add Repository</DialogTitle>
                <AddDeploymentForm/>
                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                        <Button>
                            Cancel
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
