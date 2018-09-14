#!/bin/sh

# Setup
#
# git checkout --orphan gh-pages
# git reset --hard
# git commit --allow-empty -m "Initializing gh-pages branch"
# git push origin gh-pages
# git checkout master

#DIR=$(dirname "$0")

#cd $DIR/..

if [[ $(git status -s) ]]
then
    echo "The working directory is dirty. Please commit any pending changes."
    exit 1;
fi

echo "Deleting old publication"
rm -rf public
mkdir public
git worktree prune
rm -rf .git/worktrees/public/

echo "Checking out gh-pages branch into public"
git worktree add -B gh-pages public origin/gh-pages

echo "Removing existing files"
rm -rf public/*

echo "Generating site"
brunch build
hugo

echo "Updating gh-pages branch"
cd public && \
  git add --all && \
  git commit -m "Publishing to gh-pages (publish.sh)" && \
  git push gh-pages master
