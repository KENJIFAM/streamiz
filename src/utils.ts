interface Clipboard {
  writeText(newClipText: string): Promise<void>;
}

interface NavigatorClipboard {
  readonly clipboard?: Clipboard;
}

interface Navigator extends NavigatorClipboard {}

const fallbackCopyTextToClipboard = (text: string) => {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  const copyBtn = document.querySelector('.copyBtn');

  try {
    document.execCommand('copy');
    copyBtn.setAttribute('data-tooltip', 'Copied');
  } catch (err) {
    copyBtn.setAttribute('data-tooltip', `Fallback: Oops, unable to copy: ${err}`);
  }

  document.body.removeChild(textArea);
};

export const copyTextToClipboard = (text: string) => {
  const navigatorClipboard = window.navigator as Navigator;
  if (!navigatorClipboard.clipboard) {
    fallbackCopyTextToClipboard(text);
    return;
  }
  const copyBtn = document.querySelector('.copyBtn');
  navigatorClipboard.clipboard.writeText(text)
    .then(() => copyBtn.setAttribute('data-tooltip', 'Copied'))
    .catch(err => copyBtn.setAttribute('data-tooltip', `Async: Could not copy text: ${err}`));
};

export const resetCopy = () => {
  document.querySelector('.copyBtn').setAttribute('data-tooltip', 'Copy to clipboard');
};

const timeDifference = (current: number, previous: number) => {
  const milliSecondPerMinute = 60 * 1000;
  const milliSecondPerHour = milliSecondPerMinute * 60;
  const milliSecondPerDay = milliSecondPerHour * 24;
  const milliSecondPerMonth = milliSecondPerDay * 30;
  const milliSecondPerYear = milliSecondPerDay * 365;

  const elapsed = current - previous;

  if (elapsed < milliSecondPerMinute / 3) {
    return 'just now';
  }

  if (elapsed < milliSecondPerMinute) {
    return 'less than 1 min ago';
  } else if (elapsed < milliSecondPerHour) {
    return Math.round(elapsed / milliSecondPerMinute) + ' min ago';
  } else if (elapsed < milliSecondPerDay) {
    return Math.round(elapsed / milliSecondPerHour) + ' h ago';
  } else if (elapsed < milliSecondPerMonth) {
    return Math.round(elapsed / milliSecondPerDay) + ' days ago';
  } else if (elapsed < milliSecondPerYear) {
    return Math.round(elapsed / milliSecondPerMonth) + ' months ago';
  } else {
    return Math.round(elapsed / milliSecondPerYear) + ' years ago';
  }
};

export const timeDifferenceForDate = (updatedAt: Date) => {
  const now = new Date().getTime();
  const updated = new Date(updatedAt).getTime();
  return timeDifference(now, updated);
};

const shortOption = {
  year: 'numeric',
  month: 'short',
  day: 'numeric'
};

const longOption = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric'
};

export const formatedDate = (date: Date, option?: string) => {
  return new Date(date).toLocaleString('en-US', option === 'short' ? shortOption : longOption);
};