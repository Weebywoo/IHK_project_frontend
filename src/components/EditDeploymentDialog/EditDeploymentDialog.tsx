import {type JSX} from 'react';
import {Dialog, DialogClose, DialogContent, DialogFooter, DialogTitle, DialogTrigger} from '@/components/ui/dialog.tsx';
import {Button} from '@/components/ui/button.tsx';
import type {DeploymentInfo} from '@/lib/types.ts';
import {EditDeploymentForm} from '@/components/EditDeploymentForm/EditDeploymentForm.tsx';

interface EditDeploymentDialogProps {
    deploymentInfo: DeploymentInfo;
}

export function EditDeploymentDialog({deploymentInfo}: EditDeploymentDialogProps): JSX.Element {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Edit</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>Edit Deployment</DialogTitle>
                <EditDeploymentForm
                    deploymentInfo={deploymentInfo}
                />
                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                    </DialogClose>
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
