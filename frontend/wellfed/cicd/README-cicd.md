# Installation Requirements for unix & windows agents

# Install Git
sudo apt-get update
sudo apt-get install git

# Install Python
sudo apt update
sudo apt install software-properties-common -y
sudo add-apt-repository ppa:deadsnakes/ppa -y
sudo apt update
sudo apt install python3.12 python3.12-distutils python3.12-venv -y

# Install nodejs (for nodejs project)
sudo curl -sL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs


# Install Docker
sudo apt-get update
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker.io
docker --version

# Install AzureCLI
sudo apt-get update
sudo apt-get install apt-transport-https ca-certificates curl gnupg lsb-release
curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash

# Install Pip in ubuntu
apt install python3-pip -y

# Install Ansible in ubuntu
$ sudo apt update
$ sudo apt install software-properties-common
$ sudo add-apt-repository --yes --update ppa:ansible/ansible
$ sudo apt install ansible -y

# Install kubectl with az cli
sudo az aks install-cli
kubectl version --client
kubelogin --version
az aks get-credentials --resource-group <your-resource-group> --name <your-aks-cluster>
kubectl config get-contexts

# Install SOPS
sudo apt-get update
sudo apt-get install -y sops

# Role Assignments and Necessary Permissions for Azure Pipelines and Kubernetes Deployment
To ensure a smooth deployment process, specific Azure role assignments and permissions are required for Azure resources like Azure Container Registry (ACR), Azure Kubernetes Service (AKS), and Azure Pipelines.
________________________________________
# 1. Role Assignments
1.1. Assign Role to AKS for ACR Access
By default, Kubernetes nodes in AKS cannot pull images from ACR. Assign the AcrPull role to your AKS cluster.
Command:
az aks update -n <aks-cluster-name> -g <resource-group-name> --attach-acr <acr-name>
•	This command assigns the AcrPull role to AKS, allowing it to pull images from the ACR.
________________________________________
1.2. Assign Roles for Azure Pipelines
Azure Pipelines require access to ACR and AKS for image management and deployments. Assign the following roles:
1.	Service Connection for Azure Pipelines:
o	In the Azure DevOps portal, create a service connection for Azure.
2.	Assign Role for ACR Access:
o	Assign the AcrPush role to the Azure Pipelines service principal to push images to ACR:
Command:
az role assignment create --assignee <service-principal-id> \
  --role AcrPush \
  --scope /subscriptions/<subscription-id>/resourceGroups/<resource-group-name>/providers/Microsoft.ContainerRegistry/registries/<acr-name>
3.	Assign Role for AKS Access:
o	Assign the Contributor role to the Azure Pipelines service principal for managing deployments in AKS:
Command:
az role assignment create --assignee <service-principal-id> \
  --role Contributor \
  --scope /subscriptions/<subscription-id>/resourceGroups/<resource-group-name>/providers/Microsoft.ContainerService/managedClusters/<aks-cluster-name>
________________________________________
# 2. Permission Requirements
2.1. Azure Container Registry (ACR)
•	Roles Required:
o	AcrPush: Required for pushing images to the registry.
o	AcrPull: Required for pulling images.
Commands:
•	Assign AcrPush to a user or service principal:
az role assignment create --assignee <user-or-service-principal-id> \
  --role AcrPush \
  --scope /subscriptions/<subscription-id>/resourceGroups/<resource-group-name>/providers/Microsoft.ContainerRegistry/registries/<acr-name>
2.2. Azure Kubernetes Service (AKS)
•	Roles Required:
o	Contributor: Full access to manage deployments.
o	Reader: Access to view AKS configurations.
Commands:
•	Assign Contributor to a user or service principal:
az role assignment create --assignee <user-or-service-principal-id> \
  --role Contributor \
  --scope /subscriptions/<subscription-id>/resourceGroups/<resource-group-name>/providers/Microsoft.ContainerService/managedClusters/<aks-cluster-name>
________________________________________
# 3. Verify Role Assignments
Check Role Assignments for ACR
Verify the roles assigned to ACR:
Commands:
az role assignment list --scope /subscriptions/<subscription-id>/resourceGroups/<resource-group-name>/providers/Microsoft.ContainerRegistry/registries/<acr-name> --output table
Check Role Assignments for AKS
Verify the roles assigned to AKS:
Commands:
az role assignment list --scope /subscriptions/<subscription-id>/resourceGroups/<resource-group-name>/providers/Microsoft.ContainerService/managedClusters/<aks-cluster-name> --output table
________________________________________
# 4. Role Assignment for Azure CLI Access
If we are using Azure CLI to manage deployments, ensure your user has sufficient permissions:
•	Roles Required:
o	Contributor on both ACR and AKS.
•	Assign roles to your Azure CLI user:
Commands:
az role assignment create --assignee <your-azure-cli-user-id> \
  --role Contributor \
  --scope /subscriptions/<subscription-id>/resourceGroups/<resource-group-name>
________________________________________
# 1. Prerequisites
1.	Azure Container Registry (ACR) Login: Log in to Azure Container Registry:
•	CMD: az acr login --name <acr-name>
2.	Check Kubernetes Cluster Status: Ensure Kubernetes is operational:
•	CMD: kubectl get nodes
3.	Verify Docker Installation: Confirm Docker is installed and running:
•	CMD: docker --version
________________________________________
# 2 Pipeline Setup for Variables Management
1. Install SOPS
• Installs the SOPS tool, which is used to encrypt and decrypt YAML files securely.
• SOPS is a secure and lightweight tool for managing sensitive information like secrets and configuration files.
2. Clone Variables Repository
• Clones the variables repository, which contains the encrypted variable files.
• Environment Variables:
    • git_username: Username for authenticating with GitHub.
    • git_password: Password or Personal Access Token (PAT) for authenticating with GitHub.
• Securely fetches encrypted configuration files from the remote repository.
3. Decrypt Encrypted Files
• Decrypts the encrypted YAML files (backend.enc.yaml and frontend.enc.yaml) using SOPS and saves the decrypted versions in a temporary directory ($(Pipeline.Workspace)/decrypted).
• CMD: mkdir -p $(Pipeline.Workspace)/decrypted
• CMD: sops -d aks-config/credentials/<encrypted_filename>.yaml > $(Pipeline.Workspace)/decrypted/<decrypted_filename>.yaml
•  Decrypting these files makes their content available for the pipeline steps without exposing sensitive information in plain text in the repository.
4. Export Variables from Decrypted Files
• Reads the decrypted files and exports their key-value pairs as environment variables for use in subsequent pipeline steps.
• Allows seamless integration of the decrypted variables into the pipeline workflow.
• CMD: export $(cat $(Pipeline.Workspace)/decrypted/<decrypted_filename>.yaml | xargs)
________________________________________
# 3. Dockerfile for Multi-Stage Build
The Dockerfile defines the steps to build the Docker image. It uses a multi-stage build:
•	Build Stage: Compiles and prepares the application.
•	Production Stage: Creates a lightweight image with only the necessary build artifacts.
Create a Dockerfile for the application:
________________________________________
# 4. Build and Push Docker Image
Build for a Single Platform
For most use cases:
•	CMD: docker build -t <acr-name>.azurecr.io/<app-name>:<version> .
Build for Multiple Architectures
For Kubernetes clusters with mixed architectures:
•	CMD: docker buildx build --platform linux/amd64,linux/arm64 -t <acr-name>.azurecr.io/<app-name>:<version> --push .
Push the Image
If not pushed as part of buildx:
•	CMD: docker push <acr-name>.azurecr.io/<app-name>:<version>
________________________________________
# 5. Kubernetes Deployment YAML
The deployment YAML (deployment.yaml) configures:
•	Replica count: Number of pods.
•	Container image: The Docker image to use.
•	Environment variables: API keys, URLs, and other configs.
•	Service exposure: Configures how the app is exposed to external users.
Create a deployment.yaml file for Kubernetes:
________________________________________
# 6. Deploy to Kubernetes
Apply Deployment
•	CMD: kubectl apply -f deployment.yaml
Expose as a Service
Create a service.yaml file to expose the application

Apply the service configuration:
•	CMD: kubectl apply -f service.yaml
________________________________________
# 7. Debugging Kubernetes Issues
Check Pods
List running pods:
•	CMD: kubectl get pods -n <namespace>
View Pod Logs
Inspect logs for errors:
•	CMD: kubectl logs <pod-name> -n <namespace>
Describe Pod
Get detailed information about a pod:
•	CMD: kubectl describe pod <pod-name> -n <namespace>
________________________________________
# 8. Common Error Resolutions
Error : ImagePullBackOff
Kubernetes could not pull the Docker image from the Azure Container Registry due to authentication issues or because the image did not exist.
1.	Ensure the image exists in ACR:
•	CMD: az acr repository show-tags --name <acr-name> --repository <app-name> --output table
2.	Log in to ACR:
•	CMD: az acr login --name <acr-name>
3.	Attach ACR to the AKS cluster to enable image pulling:
•	CMD: az aks update -n <aks-cluster-name> -g <resource-group-name> --attach-acr <acr-name>
4.	Restart the deployment:
•	CMD: kubectl rollout restart deployment <deployment-name> -n <namespace>
________________________________________
Error: CrashLoopBackOff
The application crashed due to missing or incorrect environment variables, misconfigured Docker images, or application runtime errors.
1.	View logs:
•	CMD: kubectl logs <pod-name> -n <namespace>
2.	Check for missing environment variables or misconfigurations.
3.	Update and apply the deployment:
•	CMD: kubectl apply -f deployment.yaml
4.	If the application fails due to resource constraints, update resource limits in the deployment:
________________________________________
Error: ImagePullBackOff
1.	Verify the image exists in your registry:
•	CMD: az acr repository show-tags --name <acr-name> --repository <app-name>
2.	Ensure Kubernetes has access to the registry by attaching the ACR to the cluster:
•	CMD: az aks update -n <aks-cluster-name> -g <resource-group-name> --attach-acr <acr-name>
________________________________________
Error : Small Build Context Transferred
•	.dockerignore excluded critical files, or the Docker build context was misconfigured.
•	Check the .dockerignore file and ensure necessary files are not excluded:
•	Verify the build context size during the Docker build process:
•	docker buildx build --no-cache -t <acr-name>.azurecr.io/<app-name>:<version> .
•	Ensure the COPY statement in the Dockerfile includes all required files:
________________________________________
# 9. Testing and Accessing the Application
Port Forwarding
To test locally:
•	CMD: kubectl port-forward deployment/<deployment-name> 3000:3000 -n <namespace>
Access the application at:
•	http://localhost:3000
Check External IP
For applications exposed via a LoadBalancer:
•	CMD: kubectl get svc -n <namespace>
________________________________________
# 10. Clean Up
Delete Kubernetes Resources
Remove deployments and services:
•	CMD: kubectl delete deployment <deployment-name> -n <namespace>
•	CMD: kubectl delete service <service-name> -n <namespace>
Prune Docker Resources
Clean up unused images, volumes, and networks:
•	CMD: docker system prune --all --volumes --force
________________________________________
# 11. Key Debugging Commands
Inspect Cluster Nodes
•	CMD: kubectl get nodes -o wide
•	CMD: kubectl describe node <node-name>
Inspect Docker Images
•	CMD: docker images
•	CMD: docker inspect <image-name>
Check Kubernetes Events
•	CMD: kubectl get events -n <namespace>
________________________________________
Replace <placeholders> with the actual values (e.g., app-name, namespace, acr-name).
Multi-platform builds are useful for hybrid Kubernetes clusters.
Always monitor logs and events for issues during deployment.
