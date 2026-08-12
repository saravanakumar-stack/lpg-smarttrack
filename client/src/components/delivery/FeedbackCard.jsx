// Warm Terracotta feedback surface: orange stars on cream, cherry text, and no fabricated review content.
import { Send, Star } from 'lucide-react';
import { useState } from 'react';

const ratingCopy = { 1: 'Needs work', 2: 'Could be smoother', 3: 'It was okay', 4: 'Really good', 5: 'Loved the delivery' };

export default function FeedbackCard({ feedback, onSubmit }) {
  const [rating, setRating] = useState(feedback?.rating || 0);
  const [note, setNote] = useState(feedback?.note || '');
  const [error, setError] = useState('');
  if (feedback) return <div className="feedback-complete"><div className="feedback-complete-icon"><Star size={22} fill="currentColor" /></div><div><span className="eyebrow">Feedback saved</span><h3>Thanks for the signal.</h3><p>You rated this delivery {feedback.rating} out of 5.</p></div></div>;
  function submit(event) { event.preventDefault(); if (!rating) { setError('Choose a star rating to continue.'); return; } onSubmit(rating, note); }
  return <form className="feedback-card" onSubmit={submit}><div className="feedback-heading"><div><span className="section-kicker">One last signal</span><h3>How did your delivery feel?</h3><p>Your rating helps the team improve the last mile.</p></div><div className="feedback-orbit"><Star size={22} fill="currentColor" /></div></div><div className="rating-row" role="radiogroup" aria-label="Delivery rating">{[1, 2, 3, 4, 5].map((value) => <button key={value} type="button" role="radio" aria-checked={rating === value} className={rating >= value ? 'is-selected' : ''} onClick={() => { setRating(value); setError(''); }} aria-label={`${value} star${value === 1 ? '' : 's'}`}><Star size={28} fill={rating >= value ? 'currentColor' : 'none'} /></button>)}</div><div className="rating-caption">{rating ? ratingCopy[rating] : 'Tap a star to rate your delivery'}</div><label htmlFor="feedback-note">Add a note <span>Optional</span></label><textarea id="feedback-note" value={note} onChange={(event) => setNote(event.target.value)} placeholder="Tell us what worked well or what could be smoother." maxLength={240} rows={3} />{error && <span className="form-error">{error}</span>}<button className="button button-orange" type="submit">Send feedback <Send size={15} /></button></form>;
}
