# Git — Quick Reference

Git is a distributed version control system. Every change is tracked, every version is recoverable, and multiple people can work in parallel without conflict.

---

## Core concepts

- **Repository (repo)** — a folder tracked by Git, containing your files and their full history
- **Working directory** — your local files as you edit them
- **Staging area (index)** — a preparation zone where you select changes before committing
- **Commit** — a saved snapshot of staged changes, with a message and a unique ID
- **Branch** — a parallel timeline; the default is called `main` (or `main`)
- **Remote** — a version of the repo hosted elsewhere (GitHub, GitLab, etc.)
- **HEAD** — a pointer to the commit you're currently working from

---

## Setup

```bash
git config --global user.name "Your Name"       # set your identity
git config --global user.email "you@email.com"  # set your email
git config --global core.editor "code --wait"   # set default editor (VS Code)
git config --list                                # view all config
```

---

## Creating & cloning repos

```bash
git init                        # initialize a new repo in current folder
git init my-project             # create a new folder and init inside it
git clone <url>                 # clone a remote repo locally
git clone <url> my-folder       # clone into a specific folder name
```

---

## Staging & committing

```bash
git status                      # show working tree status
git add file.txt                # stage a specific file
git add .                       # stage all changes in current directory
git add -p                      # interactively stage chunks (patch mode)
git commit -m "message"         # commit with a message
git commit -am "message"        # stage tracked files and commit in one step
git commit --amend              # edit the last commit (message or content)
```

---

## Viewing history

```bash
git log                         # full commit history
git log --oneline               # compact one-line-per-commit view
git log --oneline --graph       # visual branch tree
git log -n 5                    # last 5 commits
git log --author="Name"         # filter by author
git log -- file.txt             # history of a specific file
git show <commit>               # show changes introduced by a commit
git diff                        # unstaged changes vs last commit
git diff --staged               # staged changes vs last commit
git diff <branch1> <branch2>    # diff between two branches
```

---

## Undoing changes

```bash
git restore file.txt            # discard unstaged changes in a file
git restore --staged file.txt   # unstage a file (keep changes in working dir)
git revert <commit>             # create a new commit that undoes a past commit
git reset --soft HEAD~1         # undo last commit, keep changes staged
git reset --mixed HEAD~1        # undo last commit, keep changes unstaged (default)
git reset --hard HEAD~1         # undo last commit and discard all changes ⚠️
git clean -fd                   # delete untracked files and directories ⚠️
```

> ⚠️ `--hard` and `clean -fd` are destructive — changes cannot be recovered.

---

## Branches

```bash
git branch                      # list local branches
git branch -a                   # list local and remote branches
git branch my-feature           # create a new branch
git checkout my-feature         # switch to a branch (older syntax)
git switch my-feature           # switch to a branch (modern syntax)
git switch -c my-feature        # create and switch in one step
git branch -d my-feature        # delete a branch (safe — merged only)
git branch -D my-feature        # force-delete a branch
git branch -m old-name new-name # rename a branch
```

---

## Merging & rebasing

```bash
git merge my-feature            # merge a branch into current branch
git merge --no-ff my-feature    # merge with a merge commit (no fast-forward)
git merge --abort               # abort a merge in progress
git rebase main                 # rebase current branch onto main
git rebase -i HEAD~3            # interactive rebase — squash, reorder, edit commits
git rebase --abort              # abort a rebase in progress
git cherry-pick <commit>        # apply a specific commit onto current branch
```

---

## Stashing

```bash
git stash                       # save uncommitted changes temporarily
git stash push -m "wip: login"  # stash with a description
git stash list                  # view all stashes
git stash pop                   # apply most recent stash and remove it
git stash apply stash@{1}       # apply a specific stash (keep it in list)
git stash drop stash@{0}        # delete a specific stash
git stash clear                 # delete all stashes
```

---

## Remotes

```bash
git remote -v                           # list remotes
git remote add origin <url>             # add a remote named origin
git remote remove origin                # remove a remote
git remote rename origin upstream       # rename a remote
git fetch                               # download changes, don't merge
git fetch origin                        # fetch from a specific remote
git pull                                # fetch + merge current branch
git pull --rebase                       # fetch + rebase (cleaner history)
git push                                # push current branch to remote
git push -u origin my-feature          # push and set upstream tracking
git push --force-with-lease             # safe force push (checks for remote changes)
git push origin --delete my-feature    # delete a remote branch
```

---

## Tags

```bash
git tag                         # list all tags
git tag v1.0.0                  # create a lightweight tag
git tag -a v1.0.0 -m "release"  # create an annotated tag
git push origin v1.0.0          # push a tag to remote
git push origin --tags          # push all tags
git tag -d v1.0.0               # delete a local tag
```

---

## Inspecting & searching

```bash
git blame file.txt              # show who changed each line and when
git grep "search term"          # search for a string across all tracked files
git bisect start                # start a binary search for a bug
git bisect good <commit>        # mark a commit as good
git bisect bad <commit>         # mark a commit as bad
git bisect reset                # end bisect session
```

---

## Useful shortcuts

```bash
git shortlog -sn                # contributor summary (commits per author)
git reflog                      # history of HEAD movements — great for recovery
git log --stat                  # show changed files per commit
git archive --format=zip HEAD > out.zip   # export repo as zip (no .git)
```

---

## .gitignore

Create a `.gitignore` file at the root of your repo to exclude files from tracking:

```
node_modules/
.env
*.log
dist/
.DS_Store
```

Use `git check-ignore -v file.txt` to debug why a file is being ignored.

---

## Commit message convention

A widely used format is [Conventional Commits](https://www.conventionalcommits.org):

```
<type>: <short summary>

feat: add user authentication
fix: correct date parsing bug
docs: update README
refactor: extract login logic into service
chore: update dependencies
```

---

## Common workflows

**Start a feature:**
```bash
git switch -c feature/my-feature
# ... make changes ...
git add .
git commit -m "feat: add my feature"
git push -u origin feature/my-feature
# open a pull request on GitHub
```

**Sync with main before merging:**
```bash
git switch main
git pull
git switch feature/my-feature
git rebase main
```

**Undo a pushed commit safely:**
```bash
git revert <commit-hash>
git push
```
