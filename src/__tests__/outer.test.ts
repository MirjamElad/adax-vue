import { describe, it, expect } from 'vitest';
import { render, fireEvent, waitFor } from '@testing-library/vue';
import OuterTestApp from './OuterTestApp/index.vue';

describe('adax-vue syncs views with their state accordingly', () => {
  it('OuterTestApp initially renders correctly', async () => {
    const { getByTestId } = render(OuterTestApp);

    const VoteApp = getByTestId('VoteApp');
    expect(VoteApp).toBeTruthy();
    const winnerScore = getByTestId('winnerScore');
    const runnerUpScore = getByTestId('runnerUpScore');

    // Initially both scores are zeros
    expect(winnerScore.textContent).toBe('0');
    expect(runnerUpScore.textContent).toBe('0');

    const mood_0 = getByTestId('mood-0');
    const mood_1 = getByTestId('mood-1');

    // Initially both moods are neutral
    expect(mood_0.textContent).toBe('😐');
    expect(mood_1.textContent).toBe('😐');

  });

  it('Triggering write functions cause subscribed views to continuously re-render accordingly', async () => {
    const { getByTestId, getByText, getAllByText } = render(OuterTestApp);

    const VoteApp = getByTestId('VoteApp');
    expect(VoteApp).toBeTruthy();
    const winnerScore = getByTestId('winnerScore');
    const runnerUpScore = getByTestId('runnerUpScore');

    // Initially both scores are zeros
    expect(winnerScore.textContent).toBe('0');
    expect(runnerUpScore.textContent).toBe('0');

    const mood_0 = getByTestId('mood-0');
    const mood_1 = getByTestId('mood-1');

    // Initially both moods are neutral
    expect(mood_0.textContent).toBe('😐');
    expect(mood_1.textContent).toBe('😐');

    const voteBtn_0 = getByTestId('btn-0');
    fireEvent.click(voteBtn_0);

    await waitFor(() => getAllByText('😃'));

    expect(winnerScore.textContent).toBe('1');
    expect(runnerUpScore.textContent).toBe('0');
    expect(mood_0.textContent).toBe('😃');
    expect(mood_1.textContent).toBe('🤬');

    const voteBtn_1 = getByTestId('btn-1');
    fireEvent.click(voteBtn_1);

    await waitFor(() => getAllByText('😐'));

    expect(winnerScore.textContent).toBe('1');
    expect(runnerUpScore.textContent).toBe('1');
    expect(mood_0.textContent).toBe('😐');
    expect(mood_1.textContent).toBe('😐');

    fireEvent.click(voteBtn_1);

    await waitFor(() => getByText('😃'));

    expect(winnerScore.textContent).toBe('2');
    expect(runnerUpScore.textContent).toBe('1');
    expect(mood_0.textContent).toBe('🤬');
    expect(mood_1.textContent).toBe('😃');

    fireEvent.click(voteBtn_0);

    await waitFor(() => getAllByText('😐'));

    expect(winnerScore.textContent).toBe('2');
    expect(runnerUpScore.textContent).toBe('2');
    expect(mood_0.textContent).toBe('😐');
    expect(mood_1.textContent).toBe('😐');
  });

  it('Views can dynamically be mounted and sync their state accordingly', async () => {
    const { queryByTestId, getByTestId, getAllByText } = render(OuterTestApp);

    let mood_2 = queryByTestId('mood-2');

    // Initially duplicate component is not mounted!
    expect(mood_2).toBeNull();

    // We mount duplicate component with name="Red" i.e. It queries for the Red team!
    const checkbox_Red = getByTestId('checkbox-Red');
    fireEvent.click(checkbox_Red);
    //Line below is a trick to make the test wait!
    await waitFor(() => getAllByText('😐'));
    mood_2 = await getByTestId('mood-2');

    expect(mood_2).toBeTruthy();
    expect(mood_2.textContent).toBe('😐');
  });

  it('Dynamically mounted views can change the state and cause other views to re-render whenever applicable', async () => {
    const { getByTestId, getAllByText } = render(OuterTestApp);

    const checkbox_Red = getByTestId('checkbox-Red');
    fireEvent.click(checkbox_Red);
    //Line below is a trick to make the test wait!
    await waitFor(() => getAllByText('😐'));

    const mood_0 = getByTestId('mood-0');
    const mood_1 = getByTestId('mood-1');
    const mood_2 = getByTestId('mood-2');

    expect(mood_0.textContent).toBe('😐');
    expect(mood_1.textContent).toBe('😐');
    expect(mood_2.textContent).toBe('😐');

    const voteBtn_2 = getByTestId('btn-2');
    fireEvent.click(voteBtn_2);

    await waitFor(() => getAllByText('😃'));

    expect(mood_2.textContent).toBe('😃');
    expect(mood_0.textContent).toBe('😃');
    expect(mood_1.textContent).toBe('🤬');

    const voteBtn_1 = getByTestId('btn-1');
    fireEvent.click(voteBtn_1);

    await waitFor(() => getAllByText('😐'));

    expect(mood_0.textContent).toBe('😐');
    expect(mood_1.textContent).toBe('😐');
    expect(mood_2.textContent).toBe('😐');
  });

  it('Dynamically mounted views are updated on state change whenever applicable', async () => {
    const { queryByTestId, getByTestId, getAllByText } = render(OuterTestApp);
    let mood_2 = queryByTestId('mood-2');
    // Initially duplicate component is not mounted!
    expect(mood_2).toBeNull();
    // We mount duplicate component with name="Red" i.e. It queries for the Red team!
    const checkbox_Red = getByTestId('checkbox-Red');
    fireEvent.click(checkbox_Red);
    //Line below is a trick to make the test wait!
    await waitFor(() => getAllByText('😐'));
    mood_2 = getByTestId('mood-2');
    expect(mood_2.textContent).toBe('😐');
    const voteBtn_0 = getByTestId('btn-0');
    fireEvent.click(voteBtn_0);
    await waitFor(() => getAllByText('😃'));
    expect(mood_2.textContent).toBe('😃');
    const voteBtn_1 = getByTestId('btn-1');
    fireEvent.click(voteBtn_1);
    await waitFor(() => getAllByText('😐'));
    expect(mood_2.textContent).toBe('😐');
    fireEvent.click(voteBtn_1);
    await waitFor(() => getAllByText('🤬'));
    expect(mood_2.textContent).toBe('🤬');
    fireEvent.click(voteBtn_0);
    await waitFor(() => getAllByText('😐'));
    expect(mood_2.textContent).toBe('😐');
  });

  it("When a view's query get is parameters changed the view is updated with the query's new result!", async () => {
    const { queryByTestId, getByTestId, getAllByText } = render(OuterTestApp);
    let mood_2 = queryByTestId('mood-2');
    //Initially duplicate component is not mounted!
    expect(mood_2).toBeNull();
    //We mount duplicate component with name="Red" .i.e. It queries for the Red team!    
    const checkbox_Red = getByTestId('checkbox-Red');
    fireEvent.click(checkbox_Red);
    //Line below is a trick to make the test wait!
    await waitFor(() => getAllByText('😐'));
    mood_2 = getByTestId('mood-2');
    expect(mood_2.textContent).toBe('😐');
    const voteBtn_0 = getByTestId('btn-0');
    fireEvent.click(voteBtn_0);
    await waitFor(() => getAllByText('😃'));
    expect(mood_2.textContent).toBe('😃');
    const checkbox_Blue = getByTestId('checkbox-Blue');
    fireEvent.click(checkbox_Blue);
    await waitFor(() => getAllByText('🤬'));
    expect(mood_2.textContent).toBe('🤬');
    const voteBtn_1 = getByTestId('btn-1');
    fireEvent.click(voteBtn_1);
    await waitFor(() => getAllByText('😐'));
    expect(mood_2.textContent).toBe('😐');
  });
});