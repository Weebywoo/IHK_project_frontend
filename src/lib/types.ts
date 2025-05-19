export interface DeploymentInfo {
    name: string;
    id: string;
    status: string;
    url: string;
    environmentVariables: Map<string, string>;
}
