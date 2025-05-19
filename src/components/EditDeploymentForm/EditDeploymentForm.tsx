import {type ChangeEvent, type FormEvent, type JSX, useState} from 'react';
import {Input} from '@/components/ui/input.tsx';
import {Button} from '@/components/ui/button.tsx';
import type {DeploymentInfo} from '@/lib/types.ts';
import {environmentVariableMapToString, environmentVariableStringToObject, getURL} from '@/lib/utils.ts';

interface EditDeploymentFormProps {
    deploymentInfo: DeploymentInfo;
}

export function EditDeploymentForm({deploymentInfo}: EditDeploymentFormProps): JSX.Element {
    const [name, setName] = useState<string>(deploymentInfo.name);
    const [url, setUrl] = useState<string>(deploymentInfo.url);
    const [environmentVariables, setEnvironmentVariables] = useState<string>(environmentVariableMapToString(deploymentInfo.environmentVariables));

    function onSubmit(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault();

        fetch(
            getURL() + '/config/update/' + name,
            {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    url: url,
                    name: name,
                    environmentVariables: environmentVariableStringToObject(environmentVariables),
                }),
            },
        ).then((response: Response): Promise<any> => response.json());
    }

    return (
        <form onSubmit={onSubmit}>
            <div className="mb-4">
                <p className="mb-1">
                    Repository name
                </p>
                <Input
                    type="text"
                    value={name}
                    onChange={(event: ChangeEvent<HTMLInputElement>): void => setName(event.target.value)}
                />
            </div>
            <div className="mb-4">
                <p className="mb-1">
                    Repository URL
                </p>
                <Input
                    type="text"
                    value={url}
                    onChange={(event: ChangeEvent<HTMLInputElement>): void => setUrl(event.target.value)}
                />
            </div>
            <div className="mb-4">
                <p className="mb-1">
                    Environment Variables
                </p>
                <div>
                    <Input
                        type="text"
                        value={environmentVariables}
                        onChange={(event: ChangeEvent<HTMLInputElement>): void => setEnvironmentVariables(event.target.value)}
                    />
                </div>
            </div>
            <div className="flex justify-between">
                <Button type="submit">Update</Button>
            </div>
        </form>
    );
}
