// data/faqData.js

export const faqData = [
  {
    id: 1,
    question: "What is Leon Games?",
    category: "General",
    overview: "Leon Games is a high-performance, web-native gaming ecosystem built to deliver instant-access, cloud-orchestrated multiplayer experiences with no installation prerequisites.",
    detailedExplanation: "Our architecture leverages progressive WebGL 2.0 rendering engines, custom Rust-based WebAssembly game servers, and real-time WebRTC connections to bypass classic web performance bottlenecks. Players can drop directly into high-fidelity gaming environments straight from a web browser. Every game module is built dynamically to support low machine specs while yielding frame rates comparable to localized desktop apps.",
    scenarios: [
      { title: "Casual Access", text: "Instantly launch and play quick matches on any office or desktop system without requesting administrator privileges or downloading binary files." },
      { title: "Competitive Matchmaking", text: "Queue up for high-precision competitive matches backed by our server-side sub-millisecond tick infrastructure." }
    ],
    tips: [
      "Always verify that Hardware Acceleration is enabled in your browser preferences to offload asset rendering directly to your dedicated GPU.",
      "Close extensive background memory processes such as video editors or redundant browser tabs to optimize garbage collection frequency."
    ],
    notes: "Leon Games is completely client-agnostic and loads across any browser utilizing modern standards, with optimized profiles built specifically for Chromium ecosystems.",
    bestPractices: [
      "Keep web browsers updated to the latest stable versions to receive native security updates and rendering optimization patches.",
      "Use structured network adapters like Ethernet whenever playing in ranked or competitive brackets to minimize jitter."
    ],
    security: "We host client processes inside standard browser sandboxes. All critical calculation checks occur server-side, securing the system against typical client-side manipulation tools.",
    examples: [
      "Example: Initiating a high-precision battle in our tactical shooter runs fully in a browser viewport, utilizing asynchronous multi-threading to download background assets dynamic-on-demand."
    ]
  },
  {
    id: 2,
    question: "How do I create an account?",
    category: "Account",
    overview: "Creating an account on Leon Games is streamlined to quickly authorize players into secure gameplay pools while safeguarding private identity datasets.",
    detailedExplanation: "We use OAuth 2.0 secure federated credentials alongside custom email verification standards. Creating your profile establishes a localized account within our globally distributed database nodes. This structure binds user history, earned match cosmetic achievements, wallet ledgers, and dynamic profile metrics to a centralized system protected by state-of-the-art secure key stores.",
    scenarios: [
      { title: "Standard Sign-Up", text: "Enter your email, create a highly complex password, and confirm through a randomized secure validation link sent directly to your inbox." },
      { title: "Single Sign-On (SSO)", text: "Link your verified external Google, Discord, or Steam profiles for immediate account access with a single click." }
    ],
    tips: [
      "Ensure you write down your recovery backup phrase in a physical book rather than digital screenshots.",
      "Do not use common phrases or passwords that match credentials you use on legacy web forums."
    ],
    notes: "Each user is restricted to a single primary account to ensure tournament fairness and matchmaking ranking transparency.",
    bestPractices: [
      "Enable Multi-Factor Authentication (MFA/2FA) during your initial login step to prevent brute-force unauthorized attacks.",
      "Use unique user names to shield personal tracking attempts in public matchmaking pools."
    ],
    security: "Passcodes are completely hashed locally using salted bcrypt algorithms prior to database transmission. Plain-text passphrases are never stored, logged, or visible to system administrators.",
    examples: [
      "Example: Logging in through Discord redirects to Discord's official OAuth portal, returning an encrypted payload containing only your verified identity metadata to our platform."
    ]
  },
  {
    id: 3,
    question: "How do I start playing games?",
    category: "Gameplay",
    overview: "Playing games on our network requires zero setup files; browse our catalogs, click play, and allow WebStream protocols to initialize within seconds.",
    detailedExplanation: "Our custom games engine streams game resources dynamically into local system memory rather than relying on legacy client installs. When a user clicks 'Play,' our content distribution pipeline detects nearby nodes, fetches compiled WebAssembly engines, and establishes connections to dynamic regional servers. The browser caches asset packages to ensure subsequent runs load instantaneously.",
    scenarios: [
      { title: "Standard Game Start", text: "Browse our premium lobbies, select any available game, and wait for the brief asset assembly to finalize directly inside your active screen." },
      { title: "Inviting Friends", text: "Generate a localized lobby session URL, share the string directly to your team, and watch them join the room instantly upon opening the link." }
    ],
    tips: [
      "If you experience rendering stutter on high-resolution screens, reduce the game's viewport resolution in settings to ease GPU processing load.",
      "Ensure your browser window is not minimized or hidden during gameplay to prevent browser thread throttling."
    ],
    notes: "High-performance games may demand active browser-tab focusing to maintain steady sound synchronization and rendering loops.",
    bestPractices: [
      "Clear standard browser cache folders if game asset updates fail to reflect or display legacy layout states.",
      "Grant full-screen permission overlays to enable raw mouse cursor locking during target tracking sequences."
    ],
    security: "Lobby routing uses unique cryptographic tokens. Uninvited players are blocked from connecting to private matches, eliminating lobby intrusion attempts.",
    examples: [
      "Example: When launching a tournament game, our microservices allocate standard virtual instances near your geographic node to guarantee under 30ms network responses."
    ]
  },
  {
    id: 4,
    question: "Do I need to verify my identity?",
    category: "Security",
    overview: "Identity verification is applied to maintain network-wide integrity, prevent multi-accounting exploits, and satisfy global financial compliance regulations.",
    detailedExplanation: "To keep competitive lobbies clean and manage financial services smoothly, we follow an automated, multi-tiered verification framework. Casual gameplay is accessible instantly, but accessing high-stakes competitive tournaments, platform rewards, and real-money transaction portals requires verifying your identity to prevent security exploits.",
    scenarios: [
      { title: "Tier 1: Free Play", text: "No documentation required. Players can participate in all unranked match queues and default game profiles without delay." },
      { title: "Tier 2: Real Operations", text: "Requires document checks (national ID or passport) before engaging in cash tournaments or withdrawal operations." }
    ],
    tips: [
      "Submit clear, high-contrast, uncropped photographs of your official verification documents to ensure automatic systems accept them promptly.",
      "Double-check that your registered account profile matches your identification details exactly to avoid verification delays."
    ],
    notes: "Verification checks are typically completed by our automated review partners within a few minutes.",
    bestPractices: [
      "Initiate Tier 2 verification during your first week on the platform to avoid any transaction delays when withdrawing prize funds.",
      "Ensure all physical documentation pictures are taken under bright, balanced lighting with no glare."
    ],
    security: "All verification documents are processed over encrypted HTTPS channels and stored in AES-256 encrypted storage, fully isolated from open web connections.",
    examples: [
      "Example: Uploading a standard driver's license triggers our automated scanning API, validating data fields and updating account access privileges within three minutes."
    ]
  },
  {
    id: 5,
    question: "How do I deposit funds into my account?",
    category: "Financial",
    overview: "Funding your account is secure, instant, and fully integrated with global payment networks, allowing you to instantly enter prize tournaments.",
    detailedExplanation: "Our payment processing layer uses leading global merchant aggregators to offer safe and flexible funding methods. Deposits are verified through secure APIs and credited directly to your digital ledger in real-time, letting you join premium match events with zero waiting.",
    scenarios: [
      { title: "Instant Card Funding", text: "Enter standard credit or debit details. Transactions are validated instantly using secure, bank-level processing checks." },
      { title: "Digital Wallet Routing", text: "Authenticate deposits via external platforms like PayPal or Apple Pay to fund your balance without sharing card details directly." }
    ],
    tips: [
      "Confirm that your funding source is registered under your own name to prevent automated security flags.",
      "Take advantage of standard seasonal match deposit bonuses by reviewing current promo codes before completing transactions."
    ],
    notes: "Leon Games does not impose platform deposit fees, though third-party payment providers may apply localized conversion rates.",
    bestPractices: [
      "Set sensible, personalized deposit limits inside your account profile settings to support responsible gaming.",
      "Avoid refreshing the checkout screen while payment processing animations are active."
    ],
    security: "All transaction traffic is protected by end-to-end 256-bit SSL encryption. Payment Card Industry (PCI-DSS) Level 1 compliance ensures your financial data is fully secured.",
    examples: [
      "Example: Selecting a $50 deposit via Apple Pay prompts standard biometrics validation on your device, instantly updating your profile wallet balance."
    ]
  },
  {
    id: 6,
    question: "What payment methods do you support?",
    category: "Financial",
    overview: "We support a wide range of reliable global payment methods to make deposits and withdrawals convenient and secure for players everywhere.",
    detailedExplanation: "To provide a seamless experience, Leon Games works with leading payment processors around the world. We support a variety of payment methods, including major credit networks, direct bank transfers, modern digital wallets, and secure cryptocurrency options, catering to both traditional and digital-first users.",
    scenarios: [
      { title: "Credit and Debit Cards", text: "We accept Visa, Mastercard, and American Express with instant transaction processing." },
      { title: "Cryptocurrency Gateways", text: "Deposit funds securely using Bitcoin (BTC), Ethereum (ETH), or Tether (USDT) for fast, low-cost processing." }
    ],
    tips: [
      "Check with your financial institution to ensure they support online gaming transactions and don't block payments.",
      "Use cryptocurrency options for the fastest processing times and minimal network fees."
    ],
    notes: "Supported payment methods may vary based on your local regulations and country of residence.",
    bestPractices: [
      "Save your preferred payment method in your dashboard settings to make future transactions quick and simple.",
      "Verify that your payment account is in good standing before initiating larger deposits."
    ],
    security: "All transaction endpoints are fully isolated, ensuring your private payment details are never stored on public-facing servers.",
    examples: [
      "Example: Selecting Tether (USDT) displays a single-use payment address and QR code, automatically crediting your account after one block confirmation."
    ]
  },
  {
    id: 7,
    question: "How do I withdraw my winnings?",
    category: "Financial",
    overview: "Withdrawing your winnings is simple and secure. We process payouts through a transparent review system that sends funds directly to your verified accounts.",
    detailedExplanation: "We make getting your payouts as straightforward as possible. Withdrawals are handled through our secure finance system, which checks balances, verifies identity levels, and transfers your funds to your preferred account, keeping your transaction secure from start to finish.",
    scenarios: [
      { title: "Standard Card Withdrawal", text: "Send your prize funds back to the Visa or Mastercard debit card you used to make your initial deposit." },
      { title: "Direct Bank Transfer", text: "Securely wire your winnings directly to your personal bank account for convenient, high-limit transfers." }
    ],
    tips: [
      "Ensure you complete all necessary identity verification steps beforehand to enjoy the fastest possible payout processing.",
      "Request withdrawals back to your original deposit method to speed up the standard validation checks."
    ],
    notes: "Withdrawals must go through our standard security checks to comply with anti-money laundering (AML) regulations.",
    bestPractices: [
      "Double-check your account details before confirming withdrawals to prevent any bank delays or return fees.",
      "Keep track of your active promotional bonuses, as initiating a payout before meeting wagering requirements can void bonus balances."
    ],
    security: "Every withdrawal request requires multi-factor confirmation, ensuring your funds are only sent with your direct approval.",
    examples: [
      "Example: Initiating a $150 withdrawal to your verified PayPal account sends a secure confirmation code to your phone before processing the transaction."
    ]
  },
  {
    id: 8,
    question: "How long do withdrawals take?",
    category: "Financial",
    overview: "Payout times vary depending on the payment method you choose and your account's verification status, with most transactions completing in under 24 hours.",
    detailedExplanation: "We work hard to get you your funds quickly. Once you request a withdrawal, our finance team reviews it to verify match fairness and account security. Once approved, the actual transfer time depends entirely on your chosen payment processor.",
    scenarios: [
      { title: "E-Wallets & Crypto", text: "Approved payouts are transferred to your digital wallet or crypto address within 1 to 4 hours." },
      { title: "Credit Cards & Bank Wires", text: "Standard bank processing and credit cards typically take 1 to 3 business days to credit your account." }
    ],
    tips: [
      "Submit payout requests during standard business hours to get them reviewed and processed even faster.",
      "Upgrade to VIP or premium tiers to enjoy expedited, high-priority withdrawal processing."
    ],
    notes: "First-time withdrawals may take slightly longer while our security teams perform routine identity validation checks.",
    bestPractices: [
      "Avoid changing your security settings right before requesting a withdrawal, as this can trigger temporary safety holds.",
      "Keep an eye on your email for any quick updates from our billing department while your withdrawal is processing."
    ],
    security: "Every step of the payout process is fully audited and logged, protecting your funds from unauthorized transfer attempts.",
    examples: [
      "Example: A verified user requesting a withdrawal via Tether (USDT) typically receives their funds in their external wallet in less than an hour."
    ]
  },
  {
    id: 9,
    question: "Are the games fair and secure?",
    category: "Security",
    overview: "Every game on our platform is built on fully transparent, provably fair algorithms and secure server-side logic, giving all players an equal playing field.",
    detailedExplanation: "At Leon Games, fairness is built into our core. All game states, physics engine checks, and random occurrences are calculated on secure, isolated servers. Since your local browser only acts as a visual interface, our games are completely protected from external cheating programs or client-side file manipulation.",
    scenarios: [
      { title: "Provably Fair Verification", text: "Check the fairness of any random match event by comparing server seeds and cryptographic hashes in your history panel." },
      { title: "Anti-Cheat Enforcement", text: "Our systems automatically analyze inputs in real-time to detect and block automated aimbots, scripts, or speed hacks." }
    ],
    tips: [
      "You can review complete match logs in your history dashboard to analyze your gameplay and verify server integrity.",
      "Report any suspicious player behavior directly to our automated security team using the in-game reporting tool."
    ],
    notes: "All random number generators (RNG) used on the platform are certified by leading independent testing laboratories.",
    bestPractices: [
      "Only access Leon Games through our official website to ensure you are connecting to our secure servers.",
      "Keep your game settings optimized to maintain smooth performance and precise control."
    ],
    security: "Our games run inside secure server sandboxes that monitor client inputs to block any attempts at cheating or exploitation.",
    examples: [
      "Example: When you roll a random item or event, the outcome is secured using cryptographic hashes that let you verify the result was completely random and unmanipulated."
    ]
  },
  {
    id: 10,
    question: "How are game winners determined?",
    category: "Gameplay",
    overview: "Game winners are decided based on clear, standardized rules, skill-based score metrics, and server-verified performance data.",
    detailedExplanation: "We keep competition fair and clear. Every match is monitored by server-side systems that log user inputs and score updates. When a match ends, our servers verify the final scores and declare the winner, updating rankings and distributing rewards instantly.",
    scenarios: [
      { title: "PvP Match Formats", text: "The player or team with the highest verified score or best time when the match timer ends wins the game." },
      { title: "Skill-Based Tournaments", text: "Leaderboards rank players based on their best performance metrics, updating positions dynamically as new scores are verified." }
    ],
    tips: [
      "Read the rules for each game and tournament format before playing to optimize your strategy.",
      "Check your connection stability before entering competitive matches to ensure your scores sync seamlessly."
    ],
    notes: "In the event of a tie, prizes or ranking points are split evenly or decided by tie-breaker rules specific to each game.",
    bestPractices: [
      "Play matches to completion to ensure all your stats and scores are fully recorded by our servers.",
      "Take a moment to review post-match stat screens to understand how your final performance metrics were calculated."
    ],
    security: "All final scores are checked and verified by redundant server systems to prevent any manipulation or exploit attempts.",
    examples: [
      "Example: In our tactical games, match results are certified after the server confirms all player inputs, instantly updating leaderboard positions."
    ]
  },
  {
    id: 11,
    question: "What happens if my internet disconnects during a game?",
    category: "Gameplay",
    overview: "If you lose connection, our automatic system holds your place in the game briefly and attempts to reconnect you without losing your progress.",
    detailedExplanation: "We know network drops can happen. Our games feature a robust reconnection system that keeps your session active on the server for a set window, letting you rejoin your active match once your internet recovers.",
    scenarios: [
      { title: "Quick Reconnection", text: "If your connection drops briefly, our system instantly reconnects you and returns you to your active game session within seconds." },
      { title: "Extended Disconnection", text: "If you are disconnected for several minutes, the server safely concludes your match or allows a teammate to control your spot, depending on the game rules." }
    ],
    tips: [
      "If you experience frequent connection drops, switch to a wired Ethernet connection to improve stability.",
      "Keep our handy reconnect button in mind to quickly rejoin your active lobby after a browser refresh."
    ],
    notes: "Reconnection windows vary depending on the pace of the game, with faster multiplayer games having shorter windows.",
    bestPractices: [
      "Avoid starting high-stakes competitive matches if your network is unstable or performing slowly.",
      "Check your background network usage to ensure other devices or downloads aren't hogging your bandwidth during play."
    ],
    security: "Our system protects matches from exploitation by ensuring players can't disconnect intentionally to avoid a loss or manipulate match outcomes.",
    examples: [
      "Example: If your browser closes unexpectedly during a match, reopening the page immediately prompts you to rejoin your session right where you left off."
    ]
  },
  {
    id: 12,
    question: "Is my personal and financial information secure?",
    category: "Security",
    overview: "Your privacy and security are our top priorities. We protect all personal and financial data using advanced encryption and strict security standards.",
    detailedExplanation: "We use a multi-layered security system to safeguard your information. All data transfers are encrypted, and we store sensitive details in secure, isolated vaults that comply with strict global privacy regulations like GDPR and CCPA.",
    scenarios: [
      { title: "Secure Account Sign-In", text: "Your login credentials and personal details are protected by multi-factor authentication and secure server firewalls." },
      { title: "Safe Billing Transactions", text: "Your financial details are processed securely through PCI-DSS compliant gateways and are never stored on our servers." }
    ],
    tips: [
      "Enable two-factor authentication (2FA) on your account to add an extra layer of protection against unauthorized access.",
      "Never share your password or login details with anyone, including people claiming to be support staff."
    ],
    notes: "We run regular, independent security audits to ensure our platform is fully protected against the latest online threats.",
    bestPractices: [
      "Create a strong, unique password for your account using a mix of letters, numbers, and symbols.",
      "Check your active login sessions regularly in your security dashboard to monitor account access."
    ],
    security: "All connections to our platform use secure, encrypted HTTPS channels, protecting your data from interception.",
    examples: [
      "Example: When you update your email, our system sends secure verification links to both addresses to confirm you authorized the change."
    ]
  },
  {
    id: 13,
    question: "Can I play on my mobile device?",
    category: "General",
    overview: "Yes! Leon Games is fully responsive and optimized to run smoothly on smartphones and tablets without needing any app downloads.",
    detailedExplanation: "Our platform is built using modern web standards, meaning every game and feature is designed to work perfectly on mobile screens. Whether you are on iOS or Android, you can log in, play, and manage your account directly from your favorite mobile browser.",
    scenarios: [
      { title: "Mobile Browser Gaming", text: "Open our site on Safari or Chrome, log into your profile, and start playing games immediately with responsive touch controls." },
      { title: "Add to Home Screen", text: "Save our site to your mobile home screen as a Progressive Web App (PWA) for quick, app-like access." }
    ],
    tips: [
      "Play games in landscape mode on your phone to enjoy the best layout and controls.",
      "Turn off battery saver mode on your device to ensure smooth performance and maximum frame rates."
    ],
    notes: "While most of our catalog is optimized for mobile, a few complex games may require a desktop setup or keyboard for the best experience.",
    bestPractices: [
      "Keep your phone's operating system and web browser updated to the latest versions for optimal performance.",
      "Use a stable Wi-Fi connection when playing on mobile to avoid cellular data charges and connection drops."
    ],
    security: "Mobile connections are protected by the same high-level security standards as our desktop platform, keeping your sessions secure.",
    examples: [
      "Example: Launching a quick card game on your iPad offers intuitive touch controls and a layout optimized for your tablet screen."
    ]
  },
  {
    id: 14,
    question: "What countries is Leon Games available in?",
    category: "General",
    overview: "Leon Games is available to players worldwide, though local regulations may affect access to certain competitive or real-money features.",
    detailedExplanation: "We strive to bring players together from all over the world. Our platform is accessible in most countries, but features like cash tournaments or financial transactions are adjusted automatically based on your local laws and requirements.",
    scenarios: [
      { title: "Global Casual Access", text: "Players from almost any country can sign up, play free games, and join our global gaming community." },
      { title: "Regional Prize Tournaments", text: "Access to paid tournaments and cash prizes is determined automatically based on your local regulations and residency." }
    ],
    tips: [
      "Review your local laws regarding online gaming and prizes before participating in cash tournaments.",
      "Keep your location services enabled in your browser settings to verify your regional eligibility quickly and accurately."
    ],
    notes: "If you travel to a different country, your available features may update automatically to reflect local regulations.",
    bestPractices: [
      "Keep your account profile details up to date with your current country of residence to prevent any account holds.",
      "Reach out to our friendly support team if you have questions about which features are available in your region."
    ],
    security: "We use secure geolocation checks to ensure all platform features comply fully with your local laws.",
    examples: [
      "Example: A player in a region that restricts cash tournaments will automatically see only our free-to-play lobbies and skill leaderboards."
    ]
  },
  {
    id: 15,
    question: "Are there any fees for deposits or withdrawals?",
    category: "Financial",
    overview: "Leon Games does not charge any hidden fees for deposits or withdrawals, ensuring your funds go toward your gaming experience.",
    detailedExplanation: "We believe in clear and honest pricing. We don't charge any platform fees for moving money into or out of your account. Any small transaction costs you might see come entirely from your payment provider or network gas fees.",
    scenarios: [
      { title: "No-Fee Deposits", text: "When you fund your account, the full amount you deposit is credited directly to your balance with zero platform deductions." },
      { title: "Standard Payout Requests", text: "Your withdrawal requests are processed for free, with no surprise processing or platform fees." }
    ],
    tips: [
      "Check with your credit card company or bank to see if they charge any processing or currency exchange fees on their end.",
      "Use low-cost cryptocurrency options to keep network transaction fees to a minimum."
    ],
    notes: "We absorb payment processing costs whenever possible to provide a smooth, affordable experience for all players.",
    bestPractices: [
      "Review your payment provider's fee structure to choose the most cost-effective method for your transactions.",
      "Withdraw larger amounts less frequently to help minimize any flat transaction fees charged by your bank."
    ],
    security: "All billing details and fees are clearly displayed before you confirm any transaction, so you always know what to expect.",
    examples: [
      "Example: Withdrawing $100 via direct bank transfer means we send the full $100, though your bank may apply standard incoming wire fees."
    ]
  },
  {
    id: 16,
    question: "How do bonuses and promotions work?",
    category: "Marketing",
    overview: "We offer exciting bonuses and promotions to reward players, featuring clear rules and straightforward requirements.",
    detailedExplanation: "We love giving back to our community. Our rewards include deposit matches, tournament entry tickets, and special rewards, all designed with clear guidelines so you can easily understand how to unlock and enjoy them.",
    scenarios: [
      { title: "First-Deposit Bonus", text: "Get your initial deposit matched up to a set amount, giving you extra funds to jump into the action." },
      { title: "Earned Tournament Tickets", text: "Receive free entry tickets to competitive events by completing fun in-game challenges and milestones." }
    ],
    tips: [
      "Take a quick look at the promotional rules to understand the playthrough requirements before claim a bonus.",
      "Subscribe to our newsletter and notifications so you never miss out on exclusive, limited-time offers."
    ],
    notes: "Bonus funds are typically held separately from your main cash balance until the promotional goals are met.",
    bestPractices: [
      "Keep track of your promotion progress in your account dashboard to make sure you claim your rewards before they expire.",
      "Focus on games that contribute the most toward your bonus requirements to unlock your funds quickly."
    ],
    security: "Our promotional systems are monitored automatically to prevent abuse and ensure all players have a fair chance to participate.",
    examples: [
      "Example: Activating a 100% deposit match on a $20 deposit instantly adds a $20 bonus balance to your profile."
    ]
  },
  {
    id: 17,
    question: "What should I do if I forget my password?",
    category: "Account",
    overview: "If you forget your password, you can reset it quickly and securely through our automated recovery process.",
    detailedExplanation: "We make it easy to regain access to your account. Our recovery tool verified your identity via your registered email or phone number and lets you set a new secure password without compromising your account's safety.",
    scenarios: [
      { title: "Standard Email Reset", text: "Click the 'Forgot Password' link on the login screen to receive a secure, single-use password reset link in your email." },
      { title: "Two-Factor Recovery", text: "Use your pre-configured backup codes to log in securely if you lose access to your primary authentication device." }
    ],
    tips: [
      "Check your email's spam or promotional folders if you don't see the password reset link within a few minutes.",
      "Add our email address to your contacts list to ensure all system messages land directly in your inbox."
    ],
    notes: "For your security, password reset links are temporary and expire after 1 hour if they aren't used.",
    bestPractices: [
      "Store your backup recovery codes in a safe, offline place to ensure you can always access your account.",
      "Update your password immediately if you suspect someone else has gained access to your email account."
    ],
    security: "Our recovery process uses encrypted tokens that can only be generated by the verified owner of the account.",
    examples: [
      "Example: Clicking the recovery link redirects you to our secure setup screen, where you can safely choose a new, strong password."
    ]
  },
  {
    id: 18,
    question: "How can I contact customer support?",
    category: "Support",
    overview: "Our dedicated support team is here for you 24/7, offering fast and helpful assistance through live chat and email.",
    detailedExplanation: "We are committed to providing top-tier support. Whether you have a quick technical question or need help with a transaction, our friendly support team is available around the clock to ensure you have a smooth gaming experience.",
    scenarios: [
      { title: "24/7 Live Chat Support", text: "Click the support bubble on our site to start a live conversation with a helpful support agent in real-time." },
      { title: "Email Support Tickets", text: "Submit a detailed support request through our help form for in-depth inquiries and account reviews." }
    ],
    tips: [
      "Have your username and transaction details ready when contacting support to help us resolve your issue quickly.",
      "Check this helpful FAQ section and our community guides first, as you might find the answer you need instantly."
    ],
    notes: "Live chat is our fastest support option, with average response times of under 2 minutes.",
    bestPractices: [
      "Be clear and detailed when describing your issue to help our support team find the right solution quickly.",
      "Keep your support ticket numbers handy to track the progress of your requests."
    ],
    security: "Our support agents will never ask you for your password or sensitive billing details, keeping your credentials fully secure.",
    examples: [
      "Example: Opening a live support ticket regarding a transaction quickly connects you with a billing specialist who can verify your payment status."
    ]
  },
  {
    id: 19,
    question: "How do I report a bug or technical issue?",
    category: "Support",
    overview: "You can submit technical feedback or bug reports directly to our development team, helping us make the platform even better.",
    detailedExplanation: "We constant improve our systems. If you run into a technical issue or spot a bug, you can send details directly to our engineers, allowing us to investigate and roll out quick fixes to keep the games running smoothly.",
    scenarios: [
      { title: "In-Game Bug Reports", text: "Use our handy in-game reporting tool to send screenshots and automated system diagnostics straight to our development team." },
      { title: "Feedback Form Submissions", text: "Fill out our quick technical feedback form to report issues with layout, performance, or specific games." }
    ],
    tips: [
      "Include simple step-by-step instructions on how to reproduce the bug to help our team understand the issue quickly.",
      "Mention the web browser and device model you were using when the issue occurred."
    ],
    notes: "We actively reward players who report major bugs or security issues through our bug bounty program.",
    bestPractices: [
      "Check our platform status page first to see if the issue is already known or undergoing scheduled maintenance.",
      "Keep your web browser console logs handy if you are experiencing advanced rendering or loading issues."
    ],
    security: "All technical reports are processed over secure channels to prevent sensitive system or browser data from being exposed.",
    examples: [
      "Example: Reporting an interface glitch in a game lobby uploads a quick visual snapshot, letting our team fix the layout bug in our next update."
    ]
  },
  {
    id: 20,
    question: "Where can I learn about responsible gaming?",
    category: "Security",
    overview: "We support a healthy, balanced gaming environment by providing resources, limit-setting options, and links to professional support.",
    detailedExplanation: "Your well-being is incredibly important to us. Leon Games is dedicated to encouraging responsible gaming. We offer a variety of tools that let you manage your playtime and spending, alongside quick links to professional organizations if you ever need extra support.",
    scenarios: [
      { title: "Personalizing Account Limits", text: "Set daily, weekly, or monthly deposit and play-time limits in your account dashboard to keep your gaming fun and balanced." },
      { title: "Taking a Self-Exclusion Break", text: "Activate a temporary cool-down period or lock your account access entirely for a set time frame to take a healthy break." }
    ],
    tips: [
      "Set a friendly alarm or time limit before you start playing to help manage your gaming sessions easily.",
      "Treat gaming as a fun way to relax, and avoid chasing losses or playing when you feel stressed."
    ],
    notes: "Our helpful support team is fully trained to assist you in setting up account restrictions or self-exclusion options at any time.",
    bestPractices: [
      "Take a look at our complete Responsible Gaming Guide to find helpful self-assessment quizzes and advice.",
      "Take short, regular breaks during longer gaming sessions to stretch, rest your eyes, and stay refreshed."
    ],
    security: "Self-exclusion requests are applied instantly to your account profile and cannot be undone during your chosen break period, keeping your limits secure.",
    examples: [
      "Example: Setting a weekly deposit limit of $50 ensures you cannot fund your account beyond that amount until the limit resets next week."
    ]
  }
];