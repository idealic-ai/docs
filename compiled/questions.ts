export const questions = {
  "Q1": {
    "schema": {
      "type": "object",
      "description": "Question: How does the concept of a Budget as a \"collective goal\" change organizational behavior?",
      "properties": {
        "answer": {
          "type": "array",
          "items": {
            "type": "string",
            "enum": [
              "Work can begin with partial funding once minimum thresholds are met",
              "Different stakeholders can contribute different types of value (time, reputation, money) to the same goal",
              "The focus shifts from spending constraints to achieving targets",
              "Unfunded budgets can exist as plans to rally support and funding",
              "All funding must be in place before any planning can begin",
              "Only monetary contributions count toward funding a Budget",
              "Budgets without full funding are considered failures",
              "Planning and funding must happen simultaneously",
              "Each type of resource requires its own separate Budget",
              "Partial funding always causes the Budget to fail validation"
            ]
          }
        },
        "interpretation": {
          "description": "Clarify your understanding of what the question is asking by briefly explaining each term used in the question. Avoid discussing the options - that is for breakdown.",
          "type": "string"
        },
        "reasoning": {
          "description": "Provide your thought process and rationale while answering the question.",
          "type": "string"
        },
        "breakdown": {
          "description": "Detail the reasoning for each option, explaining why it is correct or incorrect.",
          "type": "string"
        },
        "confusion": {
          "description": "What is the source of your confusion?",
          "type": "string"
        },
        "suggestions": {
          "description": "What would you suggest to improve the question or in the chapter wrt to this question?",
          "type": "string"
        }
      },
      "required": [
        "answer",
        "reasoning",
        "interpretation",
        "breakdown",
        "confusion",
        "suggestions"
      ]
    },
    "correctAnswers": [
      "Work can begin with partial funding once minimum thresholds are met",
      "Different stakeholders can contribute different types of value (time, reputation, money) to the same goal",
      "The focus shifts from spending constraints to achieving targets",
      "Unfunded budgets can exist as plans to rally support and funding"
    ]
  },
  "Q2": {
    "schema": {
      "type": "object",
      "description": "Question: How does fractal planning transform budget management?",
      "properties": {
        "answer": {
          "type": "array",
          "items": {
            "type": "string",
            "enum": [
              "Long-term budgets automatically decompose into short-term actionable targets",
              "Daily actions aggregate upward to show progress against strategic goals",
              "The system can extrapolate current trends to predict future outcomes",
              "Plans remain aligned across all time scales from daily to yearly",
              "Each time scale requires a completely separate budget",
              "Short-term targets must be manually calculated from long-term plans",
              "Daily data is discarded and doesn't affect strategic views",
              "Time-based planning only works for financial metrics",
              "Extrapolation requires manual intervention and calculation",
              "Strategic and tactical planning remain separate systems"
            ]
          }
        },
        "interpretation": {
          "description": "Clarify your understanding of what the question is asking by briefly explaining each term used in the question. Avoid discussing the options - that is for breakdown.",
          "type": "string"
        },
        "reasoning": {
          "description": "Provide your thought process and rationale while answering the question.",
          "type": "string"
        },
        "breakdown": {
          "description": "Detail the reasoning for each option, explaining why it is correct or incorrect.",
          "type": "string"
        },
        "confusion": {
          "description": "What is the source of your confusion?",
          "type": "string"
        },
        "suggestions": {
          "description": "What would you suggest to improve the question or in the chapter wrt to this question?",
          "type": "string"
        }
      },
      "required": [
        "answer",
        "reasoning",
        "interpretation",
        "breakdown",
        "confusion",
        "suggestions"
      ]
    },
    "correctAnswers": [
      "Long-term budgets automatically decompose into short-term actionable targets",
      "Daily actions aggregate upward to show progress against strategic goals",
      "The system can extrapolate current trends to predict future outcomes",
      "Plans remain aligned across all time scales from daily to yearly"
    ]
  },
  "Q3": {
    "schema": {
      "type": "object",
      "description": "Question: What capabilities do decentralized and nested Budget economies provide?",
      "properties": {
        "answer": {
          "type": "array",
          "items": {
            "type": "string",
            "enum": [
              "Enterprises can run private internal ledgers while participating in a larger network",
              "Internal complexity remains invisible to the main network",
              "Only high-level funding and settlement transactions appear publicly",
              "Each level can have its own rules while maintaining perfect lineage",
              "All transactions must be recorded on the public ledger",
              "Private budgets cannot interact with the main network",
              "Internal subdivisions require approval from the network",
              "Nested budgets lose their connection to the original funding",
              "Privacy requires sacrificing auditability",
              "Each level of nesting requires a separate blockchain"
            ]
          }
        },
        "interpretation": {
          "description": "Clarify your understanding of what the question is asking by briefly explaining each term used in the question. Avoid discussing the options - that is for breakdown.",
          "type": "string"
        },
        "reasoning": {
          "description": "Provide your thought process and rationale while answering the question.",
          "type": "string"
        },
        "breakdown": {
          "description": "Detail the reasoning for each option, explaining why it is correct or incorrect.",
          "type": "string"
        },
        "confusion": {
          "description": "What is the source of your confusion?",
          "type": "string"
        },
        "suggestions": {
          "description": "What would you suggest to improve the question or in the chapter wrt to this question?",
          "type": "string"
        }
      },
      "required": [
        "answer",
        "reasoning",
        "interpretation",
        "breakdown",
        "confusion",
        "suggestions"
      ]
    },
    "correctAnswers": [
      "Enterprises can run private internal ledgers while participating in a larger network",
      "Internal complexity remains invisible to the main network",
      "Only high-level funding and settlement transactions appear publicly",
      "Each level can have its own rules while maintaining perfect lineage"
    ]
  },
  "Q4": {
    "schema": {
      "type": "object",
      "description": "Question: What distinguishes a Budget Vibe from traditional budgeting approaches?",
      "properties": {
        "answer": {
          "type": "array",
          "items": {
            "type": "string",
            "enum": [
              "Budgets are living economic engines with embedded rules and logic, not static numbers",
              "Planning (schema), funding (transactions), and authority (permissions) are radically separated",
              "Budgets can manage any quantifiable resource, not just money",
              "They act as self-regulating systems that can automatically allocate resources based on rules",
              "Budgets are simply database entries that track monetary amounts",
              "All budget changes require manual approval and cannot be automated",
              "Planning and funding must happen simultaneously in a single operation",
              "Authority to spend always requires moving funds to sub-accounts",
              "Budgets can only handle traditional currencies like USD or EUR",
              "The system focuses on constraint enforcement rather than goal achievement"
            ]
          }
        },
        "interpretation": {
          "description": "Clarify your understanding of what the question is asking by briefly explaining each term used in the question. Avoid discussing the options - that is for breakdown.",
          "type": "string"
        },
        "reasoning": {
          "description": "Provide your thought process and rationale while answering the question.",
          "type": "string"
        },
        "breakdown": {
          "description": "Detail the reasoning for each option, explaining why it is correct or incorrect.",
          "type": "string"
        },
        "confusion": {
          "description": "What is the source of your confusion?",
          "type": "string"
        },
        "suggestions": {
          "description": "What would you suggest to improve the question or in the chapter wrt to this question?",
          "type": "string"
        }
      },
      "required": [
        "answer",
        "reasoning",
        "interpretation",
        "breakdown",
        "confusion",
        "suggestions"
      ]
    },
    "correctAnswers": [
      "Budgets are living economic engines with embedded rules and logic, not static numbers",
      "Planning (schema), funding (transactions), and authority (permissions) are radically separated",
      "Budgets can manage any quantifiable resource, not just money",
      "They act as self-regulating systems that can automatically allocate resources based on rules"
    ]
  },
  "Q5": {
    "schema": {
      "type": "object",
      "description": "Question: A Marketing Director funds a `Budget` Vibe with $200k. They then grant their Ads Manager authority to spend from that budget with specific spending rules. The Ads Manager then uses their authority to post a $1k task. Which account is debited on the transaction ledger?",
      "properties": {
        "answer": {
          "type": "array",
          "items": {
            "type": "string",
            "enum": [
              "The `Budget:Marketing` for $1,000",
              "The Ads Manager's personal balance account for $1,000",
              "The company's root treasury account for $1,000",
              "No transaction is created until the task is complete"
            ]
          }
        },
        "interpretation": {
          "description": "Clarify your understanding of what the question is asking by briefly explaining each term used in the question. Avoid discussing the options - that is for breakdown.",
          "type": "string"
        },
        "reasoning": {
          "description": "Provide your thought process and rationale while answering the question.",
          "type": "string"
        },
        "breakdown": {
          "description": "Detail the reasoning for each option, explaining why it is correct or incorrect.",
          "type": "string"
        },
        "confusion": {
          "description": "What is the source of your confusion?",
          "type": "string"
        },
        "suggestions": {
          "description": "What would you suggest to improve the question or in the chapter wrt to this question?",
          "type": "string"
        }
      },
      "required": [
        "answer",
        "reasoning",
        "interpretation",
        "breakdown",
        "confusion",
        "suggestions"
      ]
    },
    "correctAnswers": [
      "The `Budget:Marketing` for $1,000"
    ]
  },
  "Q6": {
    "schema": {
      "type": "object",
      "description": "Question: What types of resources can Budgets manage beyond traditional currency?",
      "properties": {
        "answer": {
          "type": "array",
          "items": {
            "type": "string",
            "enum": [
              "Computational resources like GPU-Hours and LLM-Tokens",
              "Unrealized potential like physical assets or expertise",
              "Custom metrics like DeveloperReputation or QualityScore",
              "Time-based resources like Engineer-Hours",
              "Community metrics like Pull-Requests-Merged",
              "Only fiat currencies like USD and EUR",
              "Resources must be financial in nature",
              "Each resource type requires a separate ledger system",
              "Non-monetary resources cannot be converted or exchanged",
              "Abstract concepts cannot be quantified as resources",
              "Physical assets must be liquidated before funding a Budget"
            ]
          }
        },
        "interpretation": {
          "description": "Clarify your understanding of what the question is asking by briefly explaining each term used in the question. Avoid discussing the options - that is for breakdown.",
          "type": "string"
        },
        "reasoning": {
          "description": "Provide your thought process and rationale while answering the question.",
          "type": "string"
        },
        "breakdown": {
          "description": "Detail the reasoning for each option, explaining why it is correct or incorrect.",
          "type": "string"
        },
        "confusion": {
          "description": "What is the source of your confusion?",
          "type": "string"
        },
        "suggestions": {
          "description": "What would you suggest to improve the question or in the chapter wrt to this question?",
          "type": "string"
        }
      },
      "required": [
        "answer",
        "reasoning",
        "interpretation",
        "breakdown",
        "confusion",
        "suggestions"
      ]
    },
    "correctAnswers": [
      "Computational resources like GPU-Hours and LLM-Tokens",
      "Unrealized potential like physical assets or expertise",
      "Custom metrics like DeveloperReputation or QualityScore",
      "Time-based resources like Engineer-Hours",
      "Community metrics like Pull-Requests-Merged"
    ]
  },
  "Q7": {
    "schema": {
      "type": "object",
      "description": "Question: How does the technical architecture balance integrity with performance?",
      "properties": {
        "answer": {
          "type": "array",
          "items": {
            "type": "string",
            "enum": [
              "An immutable ledger serves as the source of truth for all transactions",
              "A separate aggregation layer provides real-time balance views",
              "Events flow from ledger to aggregator for continuous updates",
              "Validation queries hit the fast aggregation layer, not the slow ledger",
              "Complete transaction lineage is preserved for auditability",
              "All queries must read the entire transaction history",
              "The aggregation layer is the source of truth",
              "Performance requires sacrificing transaction lineage",
              "Balance checks require scanning the full ledger",
              "Events are only generated for large transactions",
              "The system uses a single database for all operations"
            ]
          }
        },
        "interpretation": {
          "description": "Clarify your understanding of what the question is asking by briefly explaining each term used in the question. Avoid discussing the options - that is for breakdown.",
          "type": "string"
        },
        "reasoning": {
          "description": "Provide your thought process and rationale while answering the question.",
          "type": "string"
        },
        "breakdown": {
          "description": "Detail the reasoning for each option, explaining why it is correct or incorrect.",
          "type": "string"
        },
        "confusion": {
          "description": "What is the source of your confusion?",
          "type": "string"
        },
        "suggestions": {
          "description": "What would you suggest to improve the question or in the chapter wrt to this question?",
          "type": "string"
        }
      },
      "required": [
        "answer",
        "reasoning",
        "interpretation",
        "breakdown",
        "confusion",
        "suggestions"
      ]
    },
    "correctAnswers": [
      "An immutable ledger serves as the source of truth for all transactions",
      "A separate aggregation layer provides real-time balance views",
      "Events flow from ledger to aggregator for continuous updates",
      "Validation queries hit the fast aggregation layer, not the slow ledger",
      "Complete transaction lineage is preserved for auditability"
    ]
  }
} as const;
