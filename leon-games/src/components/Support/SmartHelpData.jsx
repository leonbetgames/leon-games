// data/smartHelpData.js

export const smartHelpData = {
  withdrawals: {
    title: "Withdrawal Issues",
    options: [
      {
        id: "w_pending",
        label: "My withdrawal is pending",
        solution: "Standard withdrawals are processed by our compliance team within 1 to 4 hours. However, bank-side delays or network congestion on certain digital ledgers may take up to 24 hours to clear. Please verify that your profile's name matches your bank account exactly before opening a support ticket."
      },
      {
        id: "w_failed",
        label: "Withdrawal failed",
        solution: "Failed withdrawals typically indicate a name mismatch, an unverified mobile number, or bank network rejection. Ensure you have completed your SMS OTP verification and that you are withdrawing to an account registered in your legal name."
      },
      {
        id: "w_incorrect",
        label: "My balance is incorrect",
        solution: "Your wallet balance may take a moment to update after concluding a high-speed match. Try refreshing your browser page. If you entered a promotional event, verify if any promotional bonus balances have active wagering requirements."
      }
    ]
  },
  deposits: {
    title: "Deposit Issues",
    options: [
      {
        id: "d_pending",
        label: "Deposit is pending",
        solution: "Most deposits reflect instantly. If your wallet balance has not updated within 15 minutes, our payment partner may be waiting for blockchain block confirmations or bank settlement. Do not attempt to process the deposit again to avoid duplicate charges."
      },
      {
        id: "d_deducted",
        label: "Money was deducted but not credited",
        solution: "If funds left your personal account but are not in your wallet, please wait 30 minutes for automated bank reconciliation. If it still does not reflect, save your payment receipt or reference transaction ID; we will need this to trace the payment manually."
      },
      {
        id: "d_failed",
        label: "Payment transaction failed",
        solution: "Payment failures are usually due to insufficient funds, local bank restrictions on gaming transactions, or generic card processor errors. We suggest attempting the deposit using direct transfer options or digital wallet channels."
      }
    ]
  },
  account: {
    title: "Account Problems",
    options: [
      {
        id: "a_login",
        label: "I forgot my password or cannot log in",
        solution: "Click the 'Forgot Password' link on the login screen to receive a temporary recovery token in your inbox. Check your spam and promotions folders if you don't receive it within 5 minutes."
      },
      {
        id: "a_locked",
        label: "My account is locked",
        solution: "Accounts are temporarily locked after 5 consecutive failed login attempts to prevent brute-force attacks. The lock is lifted automatically after 30 minutes, or you can request a secure unlock code via your verified phone number."
      },
      {
        id: "a_verification",
        label: "Email or Phone OTP not received",
        solution: "Ensure your mobile carrier has a strong signal and isn't blocking short-code SMS updates. For email verification, verify that you entered your address correctly and check your junk mail folder."
      }
    ]
  },
  gameplay: {
    title: "Gameplay Issues",
    options: [
      {
        id: "g_disconnected",
        label: "I disconnected during a match",
        solution: "Our servers hold your lobby spot for a designated reconnection window (usually 60 seconds). If you reconnect within this window, you will rejoin your match immediately. If the disconnect is permanent, the match outcome is calculated server-side based on inputs received up to that point."
      },
      {
        id: "g_froze",
        label: "The game screen froze",
        solution: "Game freezes are usually caused by browser hardware acceleration failures or memory leaks in running tabs. Try reloading your tab, enabling GPU acceleration in your browser settings, and closing heavy background applications."
      }
    ]
  },
  bonuses: {
    title: "Bonuses & Promotions",
    options: [
      {
        id: "b_not_rec",
        label: "Weekly bonus not received",
        solution: "Weekly bonuses are calculated and distributed automatically within 24 hours of the weekly leaderboard closing (Sunday 23:59 UTC). If you didn't receive your bonus, check that your rank standing was verified and that your account is in good standing."
      },
      {
        id: "b_rules",
        label: "Promotion eligibility",
        solution: "Each promotion has specific rules (e.g., minimum activity or rank requirements). View the active rules on our rewards page to ensure your account meets all criteria."
      }
    ]
  },
  technical: {
    title: "Technical Issues",
    options: [
      {
        id: "t_slow",
        label: "Website loading slowly",
        solution: "If the platform feels sluggish, try clearing your browser's application cache, restarting your browser, or switching to a wired internet connection to minimize packet loss."
      },
      {
        id: "t_mobile",
        label: "Mobile scaling issues",
        solution: "Our platform is fully optimized for modern browsers on iOS and Android. If elements render incorrectly, ensure you are not using zoomed layout configurations or restricted private web views."
      }
    ]
  }
};