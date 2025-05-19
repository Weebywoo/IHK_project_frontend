import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table.tsx';
import type {DeploymentInfo} from '@/lib/types.ts';
import {type JSX} from 'react';
import {Button} from '@/components/ui/button.tsx';
import {getContainerStatus, getURL} from '@/lib/utils.ts';
import {EditDeploymentDialog} from '@/components/EditDeploymentDialog/EditDeploymentDialog.tsx';

interface DeploymentTableProps {
    deploymentInfoMap: Map<string, DeploymentInfo>;
    setDeploymentInfo: (state: Map<string, DeploymentInfo>) => void;
}

export function DeploymentTable({deploymentInfoMap, setDeploymentInfo}: DeploymentTableProps): JSX.Element {
    function shutdownContainer(repositoryName: string): void {
        fetch(getURL() + '/deployment/stop/' + repositoryName, {method: 'POST'});
        getContainerStatus(setDeploymentInfo);
    }

    function startContainer(repositoryName: string): void {
        fetch(getURL() + '/deployment/start/' + repositoryName, {method: 'POST'});
        getContainerStatus(setDeploymentInfo);
    }

    function removeContainer(repositoryName: string): void {
        fetch(getURL() + '/deployment/remove/' + repositoryName, {method: 'DELETE'});
        getContainerStatus(setDeploymentInfo);
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Deployment Name</TableHead>
                    <TableHead>Container ID</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    Array.from(deploymentInfoMap.keys()).map((repositoryName: string): JSX.Element => {
                        const deploymentInfo: DeploymentInfo = deploymentInfoMap.get(repositoryName)!;

                        return (
                            <TableRow key={deploymentInfo.id}>
                                <TableCell>{deploymentInfo.name}</TableCell>
                                <TableCell>{deploymentInfo.id}</TableCell>
                                <TableCell>{deploymentInfo.status}</TableCell>
                                <TableCell className="text-right">
                                    <div className="flex gap-2 justify-end">
                                        <EditDeploymentDialog
                                            deploymentInfo={deploymentInfo}
                                        />
                                        <Button
                                            variant="destructive"
                                            onClick={(): void => removeContainer(repositoryName)}
                                        >
                                            Remove
                                        </Button>
                                        {
                                            deploymentInfo.status == 'running' ?
                                                <Button
                                                    onClick={(): void => shutdownContainer(repositoryName)}
                                                    variant="destructive"
                                                >
                                                    Shutdown
                                                </Button> :
                                                <Button
                                                    onClick={(): void => startContainer(repositoryName)}
                                                    className="bg-green-500"
                                                >
                                                    Start
                                                </Button>
                                        }
                                    </div>
                                </TableCell>
                            </TableRow>
                        );
                    })
                }
            </TableBody>
        </Table>
    );
}
