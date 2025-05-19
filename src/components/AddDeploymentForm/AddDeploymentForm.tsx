import {Input} from '@/components/ui/input.tsx';
import {environmentVariableStringToObject, getURL} from '@/lib/utils.ts';
import {type ChangeEvent, type FormEvent, type JSX, useState} from 'react';
import {Button} from '@/components/ui/button.tsx';

export function AddDeploymentForm(): JSX.Element {
    const [name, setName] = useState<string>('');
    const [url, setUrl] = useState<string>('');
    const [environmentVariables, setEnvironmentVariables] = useState<string>('');

    function onSubmit(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault();

        const body = {
            url: url,
            environmentVariables: environmentVariableStringToObject(environmentVariables),
        };

        console.log(JSON.stringify(body));

        fetch(
            getURL() + '/deployment/create/' + name,
            {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(body),
            },
        ).then((response: Response): Promise<any> => response.json())
    }

    return (
        <form onSubmit={onSubmit}>
            <div className="mb-4">
                <p className="mb-1">
                    Repository name
                </p>
                <Input type="text"
                       onChange={(event: ChangeEvent<HTMLInputElement>): void => setName(event.target.value)}/>
            </div>
            <div className="mb-4">
                <p className="mb-1">
                    Repository URL
                </p>
                <Input
                    type="text"
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
                <Button type="submit">Add</Button>
            </div>
        </form>
    );
}
