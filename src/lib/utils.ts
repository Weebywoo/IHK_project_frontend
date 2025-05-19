import {type ClassValue, clsx} from 'clsx';
import {twMerge} from 'tailwind-merge';
import type {DeploymentInfo} from '@/lib/types.ts';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function getURL(): string {
    return 'http://localhost:8000/api';
}


export async function getContainerStatus(setDeploymentInfo: (deploymentInfoMap: Map<string, DeploymentInfo>) => void): Promise<void> {
    fetch(getURL() + '/status', {method: 'GET'})
        .then((response: Response): Promise<any> => response.json())
        .then((data): void => {
            const deploymentInfoMap: Map<string, DeploymentInfo> = new Map<string, DeploymentInfo>();

            for (const key of Object.keys(data.status)) {
                const environmentVariables = data.status[key].environmentVariables;
                const deploymentInfo: DeploymentInfo = {
                    name: data.status[key].name,
                    id: data.status[key].id,
                    status: data.status[key].status,
                    url: data.status[key].url,
                    environmentVariables: new Map<string, string>(),
                };

                for (const environmentVariable of Object.keys(data.status[key].environmentVariables)) {
                    deploymentInfo.environmentVariables.set(environmentVariable, environmentVariables[environmentVariable]);
                }

                deploymentInfoMap.set(key, deploymentInfo);
            }

            setDeploymentInfo(deploymentInfoMap);
        })
        .catch(console.error);
}

export function environmentVariableMapToString(environmentVariables: Map<string, string>): string {
    let result: string = '';

    for (const key of environmentVariables.keys()) {
        result += key + '=' + environmentVariables.get(key) + ';';
    }

    return result;
}


export function environmentVariableStringToObject(environmentVariables: string) {
    const environmentVariableObject = {};
    const values: string[] = environmentVariables.split(';');

    if (!values[values.length - 1]) {
        values.pop();
    }

    for (const pair of values) {
        const [key, value] = pair.split('=');

        if (key && value) {
            // @ts-ignore
            environmentVariableObject[key] = value;
        }
    }

    return environmentVariableObject;
}
