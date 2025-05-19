import {type JSX, useEffect, useState} from 'react';
import type {DeploymentInfo} from '@/lib/types.ts';
import {getContainerStatus} from '@/lib/utils.ts';
import {Button} from '@/components/ui/button.tsx';
import {AddDeploymentDialog} from '@/components/AddDeploymentDialog/AddDeploymentDialog.tsx';
import {DeploymentTable} from '@/components/DeploymentTable/DeploymentTable.tsx';


export function Overview(): JSX.Element {
    const [deploymentInfoMap, setDeploymentInfo] = useState<Map<string, DeploymentInfo>>(new Map<string, DeploymentInfo>());
    const [refresh, setRefresh] = useState<boolean>(false);

    useEffect((): void => {
        getContainerStatus(setDeploymentInfo);
        setRefresh(false);
    }, [refresh]);


    return (
        <div className={'m-4'}>
            <div className="flex gap-2 justify-center">
                <AddDeploymentDialog/>
                <Button onClick={(): void => setRefresh(true)}>Refresh</Button>
            </div>
            <DeploymentTable
                deploymentInfoMap={deploymentInfoMap}
                setDeploymentInfo={setDeploymentInfo}
            />
        </div>
    );
}
