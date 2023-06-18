import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Feedback.css'; // Custom CSS file for additional styles

import { Client, Databases } from 'appwrite';
import { nanoid } from 'nanoid';

const endpoint = 'https://cloud.appwrite.io/v1';
const project = '6475ed780344f01c4b66';

const appwrite = new Client();
appwrite.setEndpoint(endpoint).setProject(project);

const database = new Databases(appwrite, '6482b8700ed2023dc9e8');
const collectionId = '6482b877ca747cdc3edc';
const databaseId = '6482b8700ed2023dc9e8';

const Feedback = () => {
  const [reviews, setReviews] = useState([]);
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [review, setReview] = useState('');

  useEffect(() => {
    fetchReviews();
  }, []);

  async function fetchReviews() {
    try {
      const response = await database.listDocuments(databaseId, collectionId);
      setReviews(response.documents);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  }

  async function addReview(event) {
    event.preventDefault();

    try {
      const documentId = nanoid();
      const response = await database.createDocument(databaseId, collectionId, documentId, {
        name: name,
        url: url,
        review: review,
      });

      const newReview = {
        $id: response.$id,
        name: name,
        url: url,
        review: review,
      };

      setReviews((prevReviews) => [...prevReviews, newReview]);
      setName('');
      setUrl('');
      setReview('');
    } catch (error) {
      console.error('Error adding review:', error);
    }
  }

  return (
    <div className="container" style={{width:'50%'}}>
        <p style={{fontFamily:'cursive'}}>Share your online spending experience with us !!! </p>
      <h1 className="text-center"> Your Experience</h1>
      
      <form className="feedback-form" onSubmit={addReview}>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="form-control mb-3"
        />
        <input
          type="text"
          placeholder="Enter profile or product URL"
          value={url}
          onChange={(event) => setUrl(event.target.value)}
          className="form-control mb-3"
        />
        <textarea
          placeholder="Write your review"
          value={review}
          onChange={(event) => setReview(event.target.value)}
          className="form-control mb-3"
          rows="4"
        ></textarea>
        <button type="submit" className="btn btn-primary">
          Submit Review
        </button>
      </form>
      <ul className="list-unstyled mt-4">
        {reviews.map((review) => (
          <li key={review.$id} className="review-card card p-3 mb-3">
            <h3>{review.name}</h3>
            <p>{review.review}</p>
            <p>{review.url}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Feedback;
