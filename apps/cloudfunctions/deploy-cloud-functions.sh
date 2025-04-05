# See https://github.com/firebase/firebase-tools/issues/653#issuecomment-1464911379
# When taking dependencies on additional shared turborepo packages they need to be added here
if [ "$1" = "pre-deploy" ]; then
  cd "$RESOURCE_DIR"
  echo "Cloud Functions pre-deploy script: Packing shared code..."
  rm -rf temp
  mkdir ./temp
  npm run build --workspace @repo/engine
  npm pack --workspace @repo/engine --pack-destination ./temp
  npm pkg set 'dependencies.@repo/engine'='file:./temp/repo-engine-0.0.1.tgz'
  echo "Cloud Functions pre-deploy script: Done!"
  exit
elif [ "$1" = "post-deploy" ]; then
  cd "$RESOURCE_DIR"
  echo "Cloud Functions post-deploy script: Cleaning up shared code..."
  npm pkg set 'dependencies.@repo/engine'='0.0.1'
  rm -rf temp
  echo "Cloud Functions post-deploy script: Done!"
  exit
else
  echo "Not a valid parameter. Must be one of: 'pre-deploy'|'post-deploy'."
  exit
fi