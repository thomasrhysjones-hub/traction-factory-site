---
title: "AI Won't Fix Your Bad Data"
seo_title: "AI Won't Fix Bad iGaming Data | Traction Factory"
description: "Before adding AI to iGaming reporting or account management, fix the definitions, gaps and ownership issues that can distort commercial decisions."
category: AI in iGaming
date: 2026-11-20 10:00:00 +0200
---

The fastest way to undermine confidence in an AI project is to give it a set of numbers nobody agrees on, then ask it for a strategy.

In iGaming, this is an especially easy trap to fall into. Operators, studios, aggregators, affiliates and platform providers may all report on the same underlying activity from a different perspective.

AI can help identify discrepancies and reduce manual reconciliation. But **it cannot invent missing facts or make incompatible definitions comparable simply by sounding convincing.**

## Start with one simple question: what does the number mean?

Imagine a studio reviewing operator performance. Three reports show three revenue figures for the same month.

One contains gross gaming revenue. Another shows the studio's contractual share. A third reports an amount after adjustments, bonuses or other deductions.

All three may be legitimate. They're just answering different questions.

Now add currency conversion, reporting cut-off dates, settlement corrections and historical changes to contract terms.

Without agreed definitions, asking a model "which operator is our most profitable?" is not analysis. It's a guessing competition with better typography.

## The five data problems that usually matter first

### 1. Inconsistent commercial definitions

GGR, NGR, invoiced revenue, recognised revenue and contribution margin are not interchangeable. Different deductions and timing rules can change a ranking.

Write down which measure supports which decision.

### 2. Broken identity mapping

A game, studio or operator may have different IDs across reporting feeds. Rebrands and aggregator routes complicate the picture further.

Create an agreed mapping, including effective dates and a record of unresolved matches. Don't quietly merge records because their names look similar.

### 3. Missing context

A drop in revenue may be linked to a planned outage, new game launch, lobby change or a temporary campaign ending.

If the system only sees transaction data, it should identify a change, not pretend to know its cause.

### 4. Unclear access and usage rights

Personal data, partner information and confidential commercial terms cannot simply be copied into an external tool because doing so is convenient.

Check permissions, processor arrangements, retention, security and jurisdiction-specific requirements. For personal data, the [ICO's guidance on AI and data protection](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/artificial-intelligence/guidance-on-ai-and-data-protection/what-are-the-accountability-and-governance-implications-of-ai) is one useful starting point.

### 5. Nobody owns the definition

If finance, commercial and operations teams disagree about a figure, a model cannot settle the dispute authoritatively.

There needs to be an owner who can say what the metric means, where it comes from and when it changes.

## Build a small data contract before building an assistant

You don't need an enormous data transformation programme to begin. You do need a reliable subset of information.

For one use case, document:

| Question | Minimum answer |
| --- | --- |
| What is the metric? | One definition, including exclusions and deductions |
| Where does it come from? | Named source system and accountable owner |
| How fresh is it? | Refresh frequency, lag and known late adjustments |
| What does one row represent? | Operator, studio, game, day, currency or other agreed grain |
| What can be missing? | Known gaps, mapping issues and acceptable tolerances |
| Who may use it? | Permissions, contractual restrictions and retention rules |

Then test it against real decisions that commercial teams make.

For example, if an account review flags a 20% revenue decline, can the account manager trace that figure to the source and establish whether the comparison is fair?

If not, the first task is to improve reporting and validation. AI comes after that, or helps perform those checks within a controlled workflow.

*The percentage above is illustrative, not a reported customer result.*

## What should an AI-assisted reporting tool actually do?

A useful system doesn't only deliver charts and explanations. It should show its working and its limitations.

Ideally, it will:

- Cite the source and reporting period behind a claim.
- Distinguish data observations from interpretations.
- Highlight stale feeds, missing records and conflicting definitions.
- Flag anomalies for investigation rather than presenting a convenient story.
- Provide an audit trail of corrections and approvals.

This makes it much easier for a commercial leader to use the output without pretending the machine has done the thinking for them.

## So what should you do first?

Pick the most valuable recurring question your team struggles to answer. Not the question that's easiest to put in a dashboard.

Define the information needed, validate it and assign ownership. Only then decide whether the solution is straightforward automation, a statistical model, a generative assistant or simply a better report.

Sometimes the most effective AI project begins with admitting you need better data governance.

It's not particularly exciting. Neither is paying for a confident answer that's wrong.

Read more in [why AI implementation is harder in iGaming](/articles/why-ai-is-harder-to-implement-in-igaming/) or explore our [AI in iGaming guide](/ai-in-igaming/).
