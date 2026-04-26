# From Classification to Decision Intelligence: Building an AI Fraud Detection Environment

Fraud detection is often treated as a simple classification problem label a message as *fraud* or *safe*.  
But real-world systems don’t work that way.

Decisions involve uncertainty, evolving signals, and most importantly consequences.

This project explores a different approach:  
**What if fraud detection was treated as a decision-making process instead of a static prediction task?**

---

## Rethinking Fraud Detection

Traditional models answer one question:

> “Is this message fraud?”

But real systems need to answer more:

- *Why is it risky?*  
- *How confident are we?*  
- *What happens if we’re wrong?*  
- *Can we improve decisions over time?*  

This is where classification falls short.

We shift the perspective to **decision intelligence**.

---

## The Core Idea

We built a system where an **AI agent interacts with a fraud environment**, makes decisions, and receives feedback.

Instead of a one-shot prediction, the system follows a loop:
