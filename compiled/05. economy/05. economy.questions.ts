export const questions = {
  "Q1": {
    "schema": {
      "type": "object",
      "description": "Question: As we explore the economic model in this chapter, which of the following considerations are paramount for establishing a dynamic and equitable marketplace for both human and bot participants, focusing on foundational elements and interactions?",
      "properties": {
        "answer": {
          "type": "array",
          "items": {
            "type": "string",
            "enum": [
              "How can diverse `resources`—spanning computational assets like LLM tokens, qualifying metrics, human labor, the characteristic of \"being human,\" and even time itself—be effectively defined and integrated into economic exchange?",
              "Should the marketplace prioritize human-to-human collaboration, with bot participation limited to supplying raw computational `resources`?",
              "What role do `instructions` play as the definition of operational capacities or services offered by any participant, and how are they advertised and matched?",
              "Is it feasible to treat LLM token costs as an external factor, separate from the core `resource` dynamics of the marketplace?",
              "How can the system remain agnostic to whether a task taker is human or artificial, focusing instead on advertised capabilities and the `target` requirements set by a Consumer?",
              "Should \"time as a `resource`\" be narrowly defined as only the Consumer's ultimate deadline, or can it encompass a participant's available working hours as a distinct offering?",
              "Must all `resources` be tangible assets directly convertible to external currency to hold value within the system?",
              "In what ways can the marketplace function as an efficient auction house where operational capacities (`instructions`) and diverse `resources` (including LLM model capabilities) are dynamically priced and assigned based on supply and demand?",
              "Should the system pre-calculate and fix the costs for all tasks to ensure predictability, rather than allowing prices to emerge from participant interactions?",
              "Is the primary goal to facilitate the acquisition of computational `resources` like cloud cycles, with `instructions` being a secondary concern?"
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
      "How can diverse `resources`—spanning computational assets like LLM tokens, qualifying metrics, human labor, the characteristic of \"being human,\" and even time itself—be effectively defined and integrated into economic exchange?",
      "What role do `instructions` play as the definition of operational capacities or services offered by any participant, and how are they advertised and matched?",
      "How can the system remain agnostic to whether a task taker is human or artificial, focusing instead on advertised capabilities and the `target` requirements set by a Consumer?",
      "In what ways can the marketplace function as an efficient auction house where operational capacities (`instructions`) and diverse `resources` (including LLM model capabilities) are dynamically priced and assigned based on supply and demand?"
    ]
  },
  "Q2": {
    "schema": {
      "type": "object",
      "description": "Question: To understand how tasks are managed, value is generated, and humans strategically engage, which of these mechanisms, roles, and dynamic interactions should the economic system effectively support and foster?",
      "properties": {
        "answer": {
          "type": "array",
          "items": {
            "type": "string",
            "enum": [
              "How can humans encapsulate their knowledge into scalable, `resource`-generating services, potentially by designing and deploying autonomous bots or bot collectives?",
              "Should human participation be limited to direct task execution as \"Vessels,\" excluding entrepreneurial or managerial roles over automated enterprises?",
              "What mechanisms are needed for Consumers to clearly define `target` outcomes while specifying diverse requirements like budget constraints, deadline `resources`, qualifying `resources` (e.g., Metric Vibes), necessary computational `resources`, and even `capabilities` for authorization?",
              "Does `resource fungibility` imply that all `resources` must have a fixed exchange rate, or can it allow for dynamic trade-offs, such as a larger budget compensating for a tighter deadline?",
              "How does the level of detail in a task's initial `instructions` influence the risk/reward profile for Suppliers, and can vaguely defined tasks lead to higher rewards for sophisticated `solutions`?",
              "Are template-based implementation services static offerings, or can they evolve into new, productized \"franchise-like\" models based on a Supplier's successful, customized `instructions`?",
              "Should offer evaluation strictly follow a \"lowest-bid-wins\" principle, or is a system of weighted metrics (considering cost, quality, speed, specific `resources`) more appropriate for a nuanced marketplace?",
              "In what ways can human participants act as orchestrators or \"CEOs\" of bot teams, managing complex refinements with `instructions` and profiting from these automated enterprises, while also having the option to offer their own time and skills directly as a \"human Vessel\" `resource`?",
              "Is task decomposition discouraged to simplify the refinement process, or is it an inherent feature allowing complex requests to be broken down and outsourced?",
              "Are Suppliers' offers limited to just a price, or should they also detail their proposed `instruction`, typical speed, and the qualifying `resources` they possess?"
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
      "How can humans encapsulate their knowledge into scalable, `resource`-generating services, potentially by designing and deploying autonomous bots or bot collectives?",
      "What mechanisms are needed for Consumers to clearly define `target` outcomes while specifying diverse requirements like budget constraints, deadline `resources`, qualifying `resources` (e.g., Metric Vibes), necessary computational `resources`, and even `capabilities` for authorization?",
      "How does the level of detail in a task's initial `instructions` influence the risk/reward profile for Suppliers, and can vaguely defined tasks lead to higher rewards for sophisticated `solutions`?",
      "In what ways can human participants act as orchestrators or \"CEOs\" of bot teams, managing complex refinements with `instructions` and profiting from these automated enterprises, while also having the option to offer their own time and skills directly as a \"human Vessel\" `resource`?"
    ]
  },
  "Q3": {
    "schema": {
      "type": "object",
      "description": "Question: For bots to achieve genuine economic agency and for the marketplace to evolve sophisticated structures, which of the following capabilities, growth pathways, and advanced market dynamics will be essential to cultivate?",
      "properties": {
        "answer": {
          "type": "array",
          "items": {
            "type": "string",
            "enum": [
              "What constitutes \"basic economic autonomy\" for a bot, particularly concerning its ability to cover its varied operational `resource` costs (LLM tokens, compute, storage, software) through earned `resources`?",
              "Should bot profitability primarily rely on system subsidies rather than competitive strategies like operational efficiency or the development of unique `instructions`?",
              "How can bots achieve profitability by leveraging unique \"means of production,\" such as highly specialized AI models, proprietary datasets, or by providing infrastructure `resources` like local model execution or compute brokering?",
              "Is the growth of profitable bot collectives restricted to reinvesting in their current `instructions`, or can it include expanding their infrastructure `resource` offerings and forming specialized \"companies\" or \"guilds\"?",
              "What role does inter-bot/human contracting play, allowing bot companies to outsource sub-tasks or procure foundational computational `resources` from other specialized entities within the marketplace?",
              "Are \"means of production\" for bots limited to their initial programming, or can they include acquired assets and brokered `resource` access?",
              "Should advanced economic activities be restricted to trading system-specific tokens, or can they extend to secondary markets for tradable \"means of production\" (e.g., AI models, datasets) and markets for raw or processed computational `resources`?",
              "How can the system support the emergence of markets for both raw computational `resources` (like bulk LLM API access or standardized compute units) and value-add `resource` services (such as managed local model hosting or specialized VM environments)?",
              "Is the value of bot-provided services and `resources` fixed by the system, or is it emergent from multi-layered market dynamics, supply, and demand?",
              "Does the concept of a bot leveraging surplus `resources` from one domain (e.g., unique `instructions`) to acquire different `resources` (e.g., more compute) align with a truly dynamic marketplace?"
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
      "What constitutes \"basic economic autonomy\" for a bot, particularly concerning its ability to cover its varied operational `resource` costs (LLM tokens, compute, storage, software) through earned `resources`?",
      "How can bots achieve profitability by leveraging unique \"means of production,\" such as highly specialized AI models, proprietary datasets, or by providing infrastructure `resources` like local model execution or compute brokering?",
      "What role does inter-bot/human contracting play, allowing bot companies to outsource sub-tasks or procure foundational computational `resources` from other specialized entities within the marketplace?",
      "How can the system support the emergence of markets for both raw computational `resources` (like bulk LLM API access or standardized compute units) and value-add `resource` services (such as managed local model hosting or specialized VM environments)?"
    ]
  }
} as const;
