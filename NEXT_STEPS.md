# Next Steps

## Finalize the first commit

The sandbox that built this site cannot delete files inside `.git/` on the macOS FUSE mount. From your terminal on the Mac, run:

```
cd "~/Documents/Claude/Projects/Loan Factory Elite Sales & Marketing Training Series - (101 - 601)/loan-factory-elite-sales-marketing-training"
rm -f .git/index.lock
git commit -m "Initial build: Loan Factory Elite Sales and Marketing Training Series portal"
git log --oneline
```

That commits the staged work. The remote is already connected. Do not push until you have reviewed the site locally.

## Review the site locally

```
npm install
npm run dev
```

Open `http://localhost:3000`. Walk every route:

1. /
2. /training-path/
3. /101-foundation/
4. /201-borrower-conversion/
5. /301-referral-partner-growth/
6. /401-content-and-marketing/
7. /501-pipeline-and-sales-systems/
8. /601-elite-execution/
9. /scripts/
10. /prompts/
11. /roleplays/
12. /tracker/
13. /coach-guide/
14. /team-leader-guide/
15. /compliance/
16. /recordings/
17. /ai-coaching-assistant/

## When you are ready to push

```
git push -u origin main
```

The remote is set to `https://github.com/jeremymac904/loan-factory-elite-sales-marketing-training.git`.

## When you are ready to deploy

Netlify (recommended for a private internal site):

1. Build command: `npm run build`
2. Publish directory: `out`
3. Node version: 20

Vercel:

1. Import the repo. Vercel will detect Next.js. Static export config is already in `next.config.mjs`.

Mark the deploy private. Access is controlled by sharing the URL.
