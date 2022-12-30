
import MangeDb from '../../util/MangeDb';

const Comment = async (req, res) => {

    const client = MangeDb();

    try {
        const TaskCollection = client.db('Taskmanage').collection('completed');
        const id = req.query.id;
        const addedComment = req.body;

        const filter = { _id: id };
        const options = { upsert: true };
        const doc = {
            $set: {
                comment: addedComment
            }
        }

        await TaskCollection.updateOne(filter, doc, options);
        res.json({ message: 'Added Comment' })

    }

    finally {
    }


}

export default Comment