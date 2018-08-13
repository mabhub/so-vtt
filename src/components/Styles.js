import styled from 'styled-components';

export const Legende = styled.div`
  text-align: center;
  border: 1px dotted silver;
  padding: .5em;
`;

export const Month = styled.div`
  color: white;
  font-size: 1.5em;
  font-weight: bold;
  margin-top: 2em;
  line-height: 1.2;
  /* text-align: center; */
  background: #ddd;
  padding: .15em .5em;
  border-radius: .35rem;
`;

export const CalenDay = styled.div`
  font-size: .8em;
  font-family: Montserrat, sans-serif;
  line-height: 1.2;
  text-align: center;
  width: 6.5em;
  cursor: default;

  .weekDay {
    background: rgba(0, 0, 0, .1);
    border-top-left-radius: .5em;
    border-top-right-radius: .5em;
    padding: .2em 0;
  }

  .monthDay {
    border: solid rgba(0, 0, 0, .1);
    border-width: 0 1px 0 1px;
    font-size: 3em;
    letter-spacing: .05em;
    line-height: 1;
    padding: .1em 0;
  }

  .month {
    background: rgba(235, 0, 0, .75);
    border-bottom-left-radius: .5em;
    border-bottom-right-radius: .5em;
    color: white;
    font-weight: bold;
    padding: .15em 0;
  }

  span {
    display: block;
  }
`;

export const CalenDayDimmed = styled(CalenDay)`
  opacity: .25;
`;

export const Place = styled.div`
  opacity: .5;
  font-size: .8em;
  font-style: italic;
`;

export const Title = styled.div`
  font-weight: bold;
  font-size: 1.5em;
  line-height: 1;
`;

export const Emoji = styled.span`
  background: white;
  /* display: inline-block; */
  border-radius: .5em;
  padding: 0 .35em;
  margin-left: -.5em;
`;

export const LabelGroup = styled.span`
  border: 1px solid transparent;
`;

export const Label = styled.span`
  background: ${({ color }) => color || '#ddd'};
  /* border-radius: .5em; */
  border: 1px solid transparent;
  display: inline-block;
  font-family: sans;
  font-size: .75em;
  margin-right: 1px;
  padding: 0 .5em;
  cursor: default;
  ${Emoji} {
    display: none;
  }
  &:first-child {
    border-top-left-radius: .5em;
    border-bottom-left-radius: .5em;
    ${Emoji} {
      display: inline-block;
    }
  }
  &:last-child {
    border-top-right-radius: .5em;
    border-bottom-right-radius: .5em;
  }
`;

export const Event = styled.div`
  display: flex;
  align-items: flex-start;
  margin-top: 1.5em;
  ${CalenDay} {
    margin-right: 1em;
     flex: 0 0 auto;
  }
`;
